import type { NewActivityInput } from "@shared/lib/schemas/activity";
import type { OmitStrict } from "@shared/types/data/utility.types";

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
	} satisfies OmitStrict<
		NewActivityInput,
		"started_at" | "ended_at" | "start_date" | "end_date"
	>;
}
