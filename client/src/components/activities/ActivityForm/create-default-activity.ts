import type { NewActivityInput } from "@shared/lib/schemas/activity";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { createDate } from "@/lib/datetime/make-date";
import { defaultTimeWindowAwareStart } from "@/lib/datetime/time-window-aware-start";
import type { TimeWindow } from "@/types/time-window.types";

/** Instantiate a default activity,
 * @usage intended as default initial ActivityForm `activity` state when an
 * no `existingActivity` is passed (i.e. when the form is meant to create a
 * new activity, not update an existing one).
 **/
export function createDefaultActivity({
	is_task = false,
	timeWindow,
}: {
	is_task?: boolean;
	timeWindow: TimeWindow;
}) {
	const start = defaultTimeWindowAwareStart(timeWindow);

	return {
		parent_id: null,
		name: "",
		description: null,
		is_task,
		occurrence: null,
		recurrence_id: null,
		duration_milliseconds: null,
		will_recur: false,
		completed: null,
		start_date: null,
		end_date: null,
		started_at: start,
		ended_at: start.add(1, "hour"),
	} satisfies NewActivityInput;
}

/** Create the default activity for use with `CreateInlineActivity`.. */
export function createDefaultInlineActivity({
	is_task = false,
	timelineRowIndex,
	date,
}: {
	is_task?: boolean;
	/** as of right now, we render a `TimelineRow` for every hour of the day. The
	 * index corresponds to the hour. */
	timelineRowIndex: number;
	/** as of right now, we render a timeline for one day at a time. This `date`
	 * matches the date of the timeline.  */
	date: Datelike;
}) {
	const start = createDate(date).hour(timelineRowIndex).startOf("hour");

	return {
		parent_id: null,
		name: "",
		description: null,
		is_task,
		occurrence: null,
		recurrence_id: null,
		duration_milliseconds: null,
		will_recur: false,
		completed: null,
		start_date: null,
		end_date: null,
		started_at: start,
		ended_at: start.add(1, "hour"),
	} satisfies NewActivityInput;
}
