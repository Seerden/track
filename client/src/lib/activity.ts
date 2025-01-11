import { getLocalHour } from "@/lib/datetime/local";
import { createDate, now } from "@/lib/datetime/make-date";
import type { ActivityWithIds } from "@shared/types/data/activity.types";
import type { ID } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
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

/** Determine the dayjs date at which the given activity starts on the given day.
 * A multiday activity that starts before `date` will thus start on 00:00 on `date`,
 * but if the activity only takes place on `date`, this returns the actual start
 * of the activity. If the activity doesn't fall on `date` at all, this returns
 * null. */
export function activityStartOnDate(activity: ActivityWithIds, date: Dayjs) {
	if (!activityFallsOnDay(activity, date)) return null;

	const _date = date.startOf("day");
	const start = activityStart(activity);
	return start.isBefore(_date) ? _date : start;
}

/** Analogous to `activityStartOnDate`. */
export function activityEndOnDate(activity: ActivityWithIds, date: Dayjs) {
	if (!activityFallsOnDay(activity, date)) return null;
	const _date = date.endOf("day");
	const end = activityEnd(activity);
	return end.isAfter(_date) ? _date : end;
}

/** Checks if any part of `activity` falls on `date`. */
export function activityFallsOnDay(activity: ActivityWithIds, date: Dayjs) {
	const start = activityStart(activity);
	const end = activityEnd(activity);

	return (
		sameDay(start, date) ||
		sameDay(end, date) ||
		(start.isBefore(date) && end.isAfter(date))
	);
}

/** Gets the duration of an activity in hours on the given `date`.
 * Note that for e.g. Today, we limit the activity visually to end at 23:59.
 * This is done in the Today component though, so we don't have to worry about
 * it here. */
export function activityDurationOnDate(activity: ActivityWithIds, date: Dayjs) {
	const [start, end] = [
		activityStartOnDate(activity, date),
		activityEndOnDate(activity, date)
	];

	if (!end || !start) return 0;

	return end.diff(start, "minute") / 60;
}

/** Find the hour of the day (given that the activity takes place on `date`) that
 * `activity` starts at. Returns -1 if the activity does not take place on
 * `date`.
 *
 * @usage this  allows us to render activities in the correct hour row in the UI. */
export function activityStartHourOnDate(activity: ActivityWithIds, date: Dayjs) {
	if (!activityFallsOnDay(activity, date)) {
		return -1;
	}

	const start = activityStartOnDate(activity, date);
	return start ? getLocalHour(start) : -1;
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

/** Checks if an activity is a single-day all-day activity, i.e. starts at
 * midnight on a day, and ends at 23:59 (midnight) on the same day. */
export function isAllDaySingleDayActivity(activity: ActivityWithIds) {
	const [start, end] = [activityStart(activity), activityEnd(activity)];
	const [startDay, endDay] = [start.startOf("day"), end.endOf("day")];
	return (
		start.isSame(startDay) &&
		end.isSame(endDay) &&
		start.isSame(startDay.startOf("day")) &&
		end.isSame(endDay.endOf("day"))
	);
}

/** Checks if an an `activity` lasts all day on the given `date`.
 * TODO: `isAllDaySingleDayActivity()` is not necessary if we use this one properly
 * instead. */
export function isAllDayActivityOnDate(activity: ActivityWithIds, date: Dayjs) {
	const [startOfDay, endOfDay] = [date.startOf("day"), date.endOf("day")];
	const [startActivity, endActivity] = [activityStart(activity), activityEnd(activity)];
	return !startOfDay.isBefore(startActivity) && !endOfDay.isAfter(endActivity);
}

/** Given a list of `activities` and a `date`, this finds all the unique
 * (unix) timestamps at which at least one activity starts, or at least one
 * activity ends. */
export function getAllStartAndEndTimesOnDate(activities: ActivityWithIds[], date: Dayjs) {
	const times = new Set<number>();

	const startOfDay = date.startOf("day");
	const endOfDay = date.endOf("day");

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

/** Check if `activity` occurs on `timestamp` (unix timestamp). */
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
	date: Dayjs
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

/** Sort a list of `activities` in order of ascending time. If two activities
 * start at the same time, the one that lasts longer goes first. */
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
		() => [] as string[]
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

/** Checks if an `activity` starts after the point in time at which this function
 * is called. */
export function startsInFuture(activity: ActivityWithIds) {
	return activityStart(activity).isAfter(now());
}

/** Checks if an `activity` ends after the point in time at which this function is
 *called. */
export function hasNotEnded(activity: ActivityWithIds) {
	return activityEnd(activity).isAfter(now());
}
