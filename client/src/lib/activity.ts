import { getLocalHour } from "@/lib/datetime/local";
import { createDate, now } from "@/lib/datetime/make-date";
import type { Datelike } from "../types/date.types";
import type { ActivityWithIds } from "../types/server/activity.types";
import type { ID } from "../types/server/utility.types";
import { sameDay } from "./datetime/compare";

/** Gets the `start` of an activity, which is either a timestamp or
 * year-month-date string. */
export function activityStart(activity: ActivityWithIds) {
	return createDate(activity.start_date ?? activity.started_at);
}

/** Gets the `end` of an activity, which is either a timestamp or
 * year-month-date string. */
export function activityEnd(activity: ActivityWithIds) {
	return createDate(activity.end_date ?? activity.ended_at);
}

export function activityFallsOnDay(activity: ActivityWithIds, date: Datelike) {
	const [start, end] = [activityStart(activity), activityEnd(activity)];
	const day = createDate(date);

	return (
		sameDay(start, day) ||
		sameDay(end, day) ||
		(start.isBefore(day) && end.isAfter(day))
	);
}

/**
 * Gets the duration of an activity in hours.
 * TODO: the 24-hour limit in here is a temporary fix for the UI. It shouldn't
 * be in this function.
 */
export function activityDuration(activity: ActivityWithIds) {
	const [start, end] = [activityStart(activity), activityEnd(activity)];

	return Math.min(end.diff(start, "minute") / 60, 24);
}

/**
 * Find the hour of the day (given that the activity takes place on `date`) that
 * `activity` starts at. Returns -1 if the activity does not take place on
 * `date`.
 *
 * This  allows us to render activities in the correct hour row in the UI.
 */
export function activityStartHour(activity: ActivityWithIds, date: Datelike) {
	const start = activityStart(activity);

	if (!activityFallsOnDay(activity, date)) {
		return -1;
	}

	// A multiday activity that starts before `date` and continues on `date`
	// _has_ to "start" at 00:00 on `date` by definition, because we do not allow
	// interrupted activities in principle.
	if (start.isBefore(createDate(date).startOf("day"))) {
		return 0;
	}

	return getLocalHour(start);
}

/** Checks if two activities (partially) occur at the same time. */
export function isSimultaneousActivity(one: ActivityWithIds, two: ActivityWithIds) {
	const [startOne, endOne] = [activityStart(one), activityEnd(one)];
	const [startTwo, endTwo] = [activityStart(two), activityEnd(two)];

	return (
		(startOne.isBefore(endTwo) && endOne.isAfter(startTwo)) ||
		(startTwo.isBefore(endOne) && endTwo.isAfter(startOne))
	);
}

export function isAllDayActivity(activity: ActivityWithIds) {
	return activity.start_date && activity.end_date;
}

export function getAllStartAndEndTimesOnDate(
	activities: ActivityWithIds[],
	date: Datelike,
) {
	const times = new Set<number>();

	const _date = createDate(date);
	const startOfDay = _date.startOf("day");
	const endOfDay = _date.endOf("day");

	for (const activity of activities) {
		const [start, end] = [activityStart(activity), activityEnd(activity)];
		if (isAllDayActivity(activity)) {
			times.add(startOfDay.valueOf());
			times.add(endOfDay.valueOf());
			// the following check is only necessary in case we don't already only pass
			// activities that fall on `date`, but it's a good idea to keep it in
			// here for redundancy
		} else if (start.isSame(date, "day")) {
			times.add(start.valueOf());
		}
		if (end.isSame(date, "day")) {
			times.add(end.valueOf());
		}
	}

	return times;
}

function activityOccursOnTimestamp(activity: ActivityWithIds, timestamp: number) {
	const [start, end] = [activityStart(activity), activityEnd(activity)];
	return (
		// Note that `end` is exclusive (so only in `start` do we check for
		// `isSame`). this is to prevent UI overlay between an activity that ends
		// when another one starts, because in reality they do not overlap.
		(start.isSame(timestamp) || start.isBefore(timestamp)) && end.isAfter(timestamp)
	);
}

/**
 * Assign an indentation level to each activity in a list based on their
 * simultaneity. This is so activities do not overlap in the UI.
 *
 * indentation algorithm:
 * for every time step (go minute by minute, I guess, since that is the smallest unit
 * of time by which we allow activities to overlap)), take all activities that
 * occur at that time. if there are multiple activities, order them by start
 * time; if their start times are equal, order them by end time (do longer
 * activities go first, or later?). Save this order for every time step.
 * Then, the indentation level of an activity is the highest indentation level
 * of that activity in any of the time steps.
 *
 * Things to note:
 * - to be ordered on a single-day timeline, a multiday activity should be
 *   treated as one that starts at 00:00 and ends at 23:59 on the given day.
 * - to speed things up, we can first determine all the times at which an
 *   activity starts or ends, and only iterate over those times.
 *
 * */
export function assignIndentationLevelToActivities(
	activities: ActivityWithIds[],
	date: Datelike,
) {
	const timestamps = getAllStartAndEndTimesOnDate(activities, date);
	const indentation = new Map<ID, number>();

	for (const timestamp of timestamps) {
		const activitiesAtTimestamp = activities.filter((a) =>
			activityOccursOnTimestamp(a, timestamp),
		);

		const sortedByStartAndEnd = activitiesAtTimestamp.sort((a, b) => {
			const [startA, endA] = [activityStart(a), activityEnd(a)];
			const [startB, endB] = [activityStart(b), activityEnd(b)];

			return startA.isSame(startB) ? endA.diff(endB) : startA.diff(startB);
		});

		for (const [index, value] of sortedByStartAndEnd.entries()) {
			indentation.set(
				value.activity_id,
				Math.max(index, indentation.get(value.activity_id) ?? 0),
			);
		}
	}

	return indentation;
}

export function startsInFuture(activity: ActivityWithIds) {
	return activityStart(activity).isAfter(now());
}

export function hasNotEnded(activity: ActivityWithIds) {
	return activityEnd(activity).isAfter(now());
}

// TODO: make newactivity dates local!! then adjust date functions to match
