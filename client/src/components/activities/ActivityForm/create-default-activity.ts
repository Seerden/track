import type { NewActivityInput } from "@shared/lib/schemas/activity";
import { now } from "@/lib/datetime/make-date";

/** Instantiate a default activity,
 * @usage intended as default initial ActivityForm `activity` state when an
 * no `existingActivity` is passed (i.e. when the form is meant to create a
 * new activity, not update an existing one).
 **/
export function createDefaultActivity({
	is_task = false,
}: {
	is_task?: boolean;
}) {
	return {
		name: "",
		description: null,
		is_task,
		occurrence: null,
		recurrence_id: null,
		duration_milliseconds: null,
		will_recur: false,
		completed: null,
		started_at: now(),
		ended_at: now().add(1, "hour"),
		start_date: null,
		end_date: null,
	} satisfies NewActivityInput;
}
