import { isNullish } from "@shared/lib/is-nullish";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
import {
	activityEnd,
	activityEndOnDate,
	activityOccursOnTimestamp,
	activityStart,
	activityStartOnDate,
	getActivityId,
	getAllStartAndEndTimesOnDate,
	isSimultaneousActivity,
	sortActivitiesByTime,
	timeSort
} from "./activity";

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
	activities: PossiblySyntheticActivity[],
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
			const newLevel = Math.max(index, indentation.get(getActivityId(value)) ?? 0);

			indentation.set(getActivityId(value), newLevel);
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
		indentation.set(getActivityId(activityToOffset), newLevel++);
		activityToOffset = firstOverlappingActivity(activities, indentation);
	}

	compressIndentation({ date, indentation, activities });

	return indentation;
}

/** This is the final step of `assignIndentationLevelToActivities`: look for
   activities with indentation > 0 that could possibly be shifted back by any
   amount of indentation. Do that until there are no more gaps to fill. */
function compressIndentation({
	date,
	indentation,
	activities
}: {
	date: Dayjs;
	indentation: Map<ID, number>;
	activities: PossiblySyntheticActivity[];
}) {
	const startOfWindow = date.startOf("day");
	const endOfWindow = date.endOf("day");

	// Only activities that already have indentation > 0 are candidates for
	// "compression" (i.e. being shifted back to a lower level).
	// We sort them by start time, and sub-sort by duration (it looks more
	// balanced when longer activities are further to the left on the timeline).
	const candidateActivities = activities
		.filter((a) => (indentation.get(getActivityId(a)) ?? -1) > 0)
		.sort((a, b) => timeSort([a, b]));

	for (const activity of candidateActivities) {
		const currentLevel = indentation.get(getActivityId(activity))!;
		for (const level of Array.from({ length: currentLevel }).map((_, i) => i)) {
			const filtered = activities
				.filter((a) => {
					return (
						!isNullish(indentation.get(getActivityId(a))) &&
						indentation.get(getActivityId(a)) === level
					);
				})
				.sort((a, b) => {
					const [startA, endA] = [activityStart(a), activityEnd(a)];
					const [startB, endB] = [activityStart(b), activityEnd(b)];
					return startA.isSame(startB) ? endB.diff(endA) : startA.diff(startB);
				});

			if (activityFallsInGap(activity, filtered, startOfWindow, endOfWindow)) {
				indentation.set(getActivityId(activity), level);
				break;
			}
		}
	}
}

/** Check if there is a gap on the timeline (at a given level `activities` are
 * assumed to already be filtered by level outside of this function) in which
 * `activity` can fit. */
export function activityFallsInGap(
	activity: PossiblySyntheticActivity,
	/** assume activities are sorted in time, and further by duration */
	activities: PossiblySyntheticActivity[],
	/** timestamp for start of window */
	start: Dayjs,
	/** timestamp for end of window */
	end: Dayjs
) {
	const count = activities.length;
	if (count === 0) return true;

	const aStart = activityStart(activity);
	const aEnd = activityEnd(activity);

	let activityIndex = 0;
	let gapStart: Dayjs = start;
	let gapEnd: Dayjs = activityStartOnDate(activities.at(0)!, start) ?? start;

	while (activityIndex <= count) {
		if (activityIndex === count) {
			gapStart = activityEndOnDate(activities.at(-1)!, end)!;
			gapEnd = end;
		} else if (activityIndex > 0) {
			gapStart = activityEndOnDate(activities.at(activityIndex - 1)!, start) ?? start;
			gapEnd = activityStartOnDate(activities.at(activityIndex)!, end) ?? end;
		}

		if (!aStart.isBefore(gapStart) && !aEnd.isAfter(gapEnd)) {
			return true;
		}

		activityIndex += 1;
	}

	return false;
}

/**
 * Given a list of activities and an indentation map, find the first activity
 * that overlaps with another activity (= falls on same time as another activity
 * with the same indentation level)
 */
function firstOverlappingActivity(
	activities: PossiblySyntheticActivity[],
	indentation: Map<ID, number>
) {
	// this is an array with a slot (empty array) for each level of indentation
	const idsByLevel = Array.from({
		length: 1 + Math.max(...indentation.values())
	}).map((index) =>
		[...indentation.entries()]
			.filter(([_, level]) => level === index)
			.map(([id, _]) => id)
	);

	for (const group of idsByLevel) {
		for (const id of group) {
			const rest = group.filter((i) => i !== id);
			for (const otherId of rest) {
				const [first, second] = [id, otherId].map((id) =>
					activities.find((activity) => getActivityId(activity) === id)
				);

				if (!first || !second) continue;

				if (isSimultaneousActivity(first, second)) {
					// .at(1) looks better, but .at(0) looks more like intended order
					return sortActivitiesByTime([first, second]).at(1);
				}
			}
		}
	}
}
