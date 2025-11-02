import {
	type ActivityWithIds,
	activityWithIdsSchema,
	type PossiblySyntheticActivity,
	type Recurrence,
	type SyntheticActivity,
	syntheticActivitySchema,
} from "@shared/lib/schemas/activity";
import type { DayOfWeek } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
import { v7 as uuid } from "uuid";
import type { TimeWindow } from "@/types/time-window.types";
import { activityEnd, activityStart, isAllDayActivityOnDate } from "./activity";
import { createDate } from "./datetime/make-date";
import { dayMap } from "./day-map";

export function isSyntheticActivity(
	activity: PossiblySyntheticActivity
): activity is SyntheticActivity {
	return "synthetic" in activity && activity.synthetic === true;
}

export function createSyntheticActivity(
	activity: ActivityWithIds
): SyntheticActivity {
	return syntheticActivitySchema.parse({
		...activity,
		activity_id: null,
		completed: false,
		synthetic: true,
		synthetic_id: `${activity.activity_id}-${activity.recurrence_id}-${uuid()}`,
		tag_ids: activity.tag_ids,
		// TODO: when converting a synthetic activity to a real one, update
		// created_at.
	} as SyntheticActivity);
}

function isCalendarRecurrence(recurrence: Recurrence) {
	return recurrence.frequency === "calendar";
}

export function createSyntheticActivitiesForTimeWindow({
	activity,
	recurrence,
	timeWindow,
}: {
	activity: ActivityWithIds;
	recurrence: Recurrence;
	timeWindow: TimeWindow;
}) {
	const start = activityStart(activity);
	const end = activityEnd(activity);

	// For activities that start after the time window, we don't need synthetics,
	// because they won't be visible anyway.
	if (start.isAfter(timeWindow.endDate)) return [];

	const createSyntheticsArgs = {
		recurrence,
		activity,
		timeWindow,
		start,
		end,
	};

	return isCalendarRecurrence(recurrence)
		? createSyntheticsForCalendarRecurrence(createSyntheticsArgs)
		: createSyntheticsForNumericRecurrence(createSyntheticsArgs);
}

/** Compute the start/end date for a synthetic numeric activity using the
 * specified recurrence relation and the iteration number.
 * @usage helper for createSyntheticsForNumericRecurrence */
function nextDate(date: Dayjs, iteration: number, recurrence: Recurrence) {
	return date.add(
		(iteration + 1) * recurrence.interval,
		recurrence.interval_unit
	);
}

type CreateSynthetics = (args: {
	recurrence: Recurrence;
	activity: ActivityWithIds;
	timeWindow: TimeWindow;
	/** start date of the original activity */
	start: Dayjs;
	/** end date of the original activity */
	end: Dayjs;
}) => SyntheticActivity[];

/** Create synthetic activity entries for a `numeric` recurrence (refers to e.g.
 * "every 3 days"). */
const createSyntheticsForNumericRecurrence: CreateSynthetics = ({
	recurrence,
	activity,
	timeWindow,
	start,
	end,
}) => {
	// if an activity starts as all-day, then all of its recurrences should be
	// all-day, too
	const isAllDay = isAllDayActivityOnDate(activity, start);
	const synthetics: SyntheticActivity[] = [];
	let recurrenceStart = createDate(recurrence.start_timestamp);
	let iteration = 0;

	while (
		!recurrenceStart.isAfter(timeWindow.endDate) &&
		(!recurrence.end_timestamp ||
			(recurrence.end_timestamp &&
				!recurrenceStart.isAfter(createDate(recurrence.end_timestamp))))
	) {
		const syntheticStart = nextDate(start, iteration, recurrence);
		const syntheticEnd = nextDate(end, iteration, recurrence);
		const syntheticActivity = createSyntheticActivity(
			activityWithIdsSchema.parse({
				...activity,
				end_date: isAllDay ? syntheticEnd : null,
				ended_at: isAllDay ? null : syntheticEnd,
				start_date: isAllDay ? syntheticStart : null,
				started_at: isAllDay ? null : syntheticStart,
			})
		);

		// we only create the synthetic activity if the start date falls within
		// the time window. Otherwise, we'd have to ensure that the activity is
		// manually filtered out again, which could be a UI bug, and it's
		// definitely a performance waste.
		if (
			!activityStart(syntheticActivity).isAfter(timeWindow.endDate) &&
			!activityEnd(syntheticActivity).isBefore(timeWindow.startDate)
		) {
			synthetics.push(syntheticActivity);
		}

		recurrenceStart = recurrenceStart.add(
			recurrence.interval,
			recurrence.interval_unit
		);
		iteration++;
	}

	return synthetics;
};

/** Create synthetic activities for `calendar` recurrences (refers to fixed days
 * of week or month). */
const createSyntheticsForCalendarRecurrence: CreateSynthetics = ({
	recurrence,
	activity,
	timeWindow,
	start,
	end,
}) => {
	const recurrenceStart = createDate(recurrence.start_timestamp);
	const isAllDayActivity = isAllDayActivityOnDate(activity, recurrenceStart);
	const synthetics: SyntheticActivity[] = [];
	let iteration = 0;
	// for numeric recurrences, we iterated in steps of recurrence.interval,
	// but here we have to check each day in the time window individually,
	// because calendar recurrences are irregular. Use this variable to iterate
	// over the days in the time window
	let rollingStart = createDate(timeWindow.startDate);
	// we need this fixed offset between the start of the time window and the
	// start date of the activity to determine the start and end dates of the
	// synthetic entries.
	// NOTE: .diff(_, "day") between e.g. January 2 noon to January 1 3 pm is 0, because less
	// than a full day passed. But we consider it to be 1 day (because that's the
	// difference). That's why we set the offset comparison to the end of each day.
	const offset = rollingStart.endOf("day").diff(start.endOf("day"), "day");

	while (
		!rollingStart.isAfter(timeWindow.endDate) &&
		!recurrenceStart.isAfter(timeWindow.endDate) &&
		(!recurrence.end_timestamp ||
			(recurrence.end_timestamp &&
				!recurrenceStart.isAfter(createDate(recurrence.end_timestamp))))
	) {
		// these are the fields that will be set on the synthetic activity
		let end_date, start_date, ended_at, started_at;

		if (
			recurrence.weekdays?.includes(
				dayMap.get(rollingStart.day()) as DayOfWeek
			) ||
			recurrence.monthdays?.includes(rollingStart.date())
		) {
			// TODO: does dayjs ensure that this then always is set to the
			// start of the day, or does it do something like add 24 hours
			// and pretend it's shifted it a single day? (relevant for e.g.
			// daylight savings, since then the isAllDay check on the
			// synthetic activity could fail, even if it shouldn't)
			const newStart = start.add(offset + iteration, "day");
			const newEnd = end.add(offset + iteration, "day");

			start_date = isAllDayActivity ? newStart : null;
			end_date = isAllDayActivity ? newEnd : null;
			started_at = isAllDayActivity ? null : newStart;
			ended_at = isAllDayActivity ? null : newEnd;

			const synthetic = createSyntheticActivity(
				activityWithIdsSchema.parse({
					...activity,
					start_date,
					started_at,
					end_date,
					ended_at,
				})
			);

			if (
				// only push if synthetic falls inside the time window
				!activityStart(synthetic).isAfter(timeWindow.endDate) &&
				!activityEnd(synthetic).isBefore(timeWindow.startDate) &&
				// if the synthetic activity is identical to the original, discard it
				offset + iteration > 0
			) {
				synthetics.push(synthetic);
			}
		}

		rollingStart = rollingStart.add(1, "day");
		iteration++;
	}

	return synthetics;
};
