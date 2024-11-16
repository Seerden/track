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
 * Note that for e.g. Today, we limit the activity visually to end at 23:59.
 * This is done in the Today component though, so we don't have to worry about
 * it here.
 */
export function activityDuration(activity: ActivityWithIds) {
	const [start, end] = [activityStart(activity), activityEnd(activity)];

	return end.diff(start, "minute") / 60;
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

export function isAllDaySingleDayActivity(activity: ActivityWithIds) {
	// an all-day activity can be found two ways: (1) either start_date and
	// end_date are set and we assume the activity is all-day/multiday, or (2) a
	// multiday activity has started_at and ended_at and we have to check for
	// every day in-between if the activity is all day on that day. This function
	// only handles (1). (2) is handled by isAllDayActivityOnDate, see below.

	return activity.start_date && activity.end_date;
}

// TODO: isAllDaySingleDayActivity is not necessary if we use this one properly
// instead.
export function isAllDayActivityOnDate(activity: ActivityWithIds, date: Datelike) {
	const [startOfDay, endOfDay] = [
		createDate(date).startOf("day"),
		createDate(date).endOf("day")
	];
	const [startActivity, endActivity] = [activityStart(activity), activityEnd(activity)];
	return !startOfDay.isBefore(startActivity) && !endOfDay.isAfter(endActivity);
}

export function getAllStartAndEndTimesOnDate(
	activities: ActivityWithIds[],
	date: Datelike
) {
	const times = new Set<number>();

	const _date = createDate(date);
	const startOfDay = _date.startOf("day");
	const endOfDay = _date.endOf("day");

	for (const activity of activities) {
		const [start, end] = [activityStart(activity), activityEnd(activity)];
		if (isAllDaySingleDayActivity(activity)) {
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

	return new Set(Array.from(times).sort());
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
	date: Datelike
) {
	const timestamps = getAllStartAndEndTimesOnDate(activities, date);
	const indentation = new Map<ID, number>();

	for (const timestamp of timestamps) {
		const activitiesAtTimestamp = activities.filter((a) =>
			activityOccursOnTimestamp(a, timestamp)
		);

		const sortedByStartAndEnd = sortActivitiesByTime(activitiesAtTimestamp);

		for (const [index, value] of sortedByStartAndEnd.entries()) {
			const newLevel = Math.max(index, indentation.get(value.activity_id) ?? 0);

			indentation.set(value.activity_id, newLevel);
		}
	}

	let activityToOffset = firstOverlappingActivity(activities, indentation);
	// TODO: absolutely ideally, newLevel would be specific to the ID that is
	// being offset, but that complicates the logic for offsetOverlapping for
	// little gain; the most important thing is just to have no overlapping
	// activities on the timeline, and this works well enough for realistic
	// use-cases.
	// TODO: now we go by groups in a timescan way, but we could also find _all_
	// overlaps and then first handle the one that start first, etc.
	let newLevel = 0;
	while (activityToOffset) {
		indentation.set(activityToOffset.activity_id, newLevel++);
		activityToOffset = firstOverlappingActivity(activities, indentation);
	}

	return indentation;
}

function sortActivitiesByTime(activities: ActivityWithIds[]) {
	return activities.sort((a, b) => {
		const [startA, endA] = [activityStart(a), activityEnd(a)];
		const [startB, endB] = [activityStart(b), activityEnd(b)];

		return startA.isSame(startB) ? endA.diff(endB) : startA.diff(startB);
	});
}

/**
 * Given a list of activities and an indentation map, find the first activity
 * that overlaps with another activity (= falls on same time as another activity
 * with the same indentation level)
 */
function firstOverlappingActivity(
	activities: ActivityWithIds[],
	indentation: Map<ID, number>
) {
	const grouped = Array.from(
		{ length: 1 + Math.max(...Array.from(indentation.values())) },
		() => [] as number[]
	);
	for (const [id, level] of indentation.entries()) {
		grouped[level]?.push(id);
	}

	for (const group of grouped) {
		for (const id of group) {
			const rest = group.filter((i) => i !== id);
			for (const otherId of rest) {
				const first = activities.find((a) => a.activity_id === id);
				const second = activities.find((a) => a.activity_id === otherId);
				if (!first || !second) continue;
				if (isSimultaneousActivity(first, second)) {
					return sortActivitiesByTime([first, second]).at(0); // .at(1) looks better, but .at(0) looks more like intended order
				}
			}
		}
	}
}

export function startsInFuture(activity: ActivityWithIds) {
	return activityStart(activity).isAfter(now());
}

export function hasNotEnded(activity: ActivityWithIds) {
	return activityEnd(activity).isAfter(now());
}
