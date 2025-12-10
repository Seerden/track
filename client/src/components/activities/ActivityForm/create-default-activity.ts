import type { NewActivityInput } from "@shared/lib/schemas/activity";
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
