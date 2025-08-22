import {
	type ActivityWithIds,
	activityWithIdsSchema,
	type NewActivityInput,
	newActivityInputSchema,
} from "@shared/lib/schemas/activity";
import { activityGuards } from "@shared/types/data/activity.guards";
import { createDate } from "@/lib/datetime/make-date";
import type { ActivityState } from "./activity-state.types";

/** If `activity` is an all-day activity (which we determine by seeing if it's
 * an activity withDates), set end_date to the end of that day.
 * @usage we need to do this before submitting a new or updated activity,
 * because in this case the UI contains a date-input which only takes a date,
 * but for elsewhere in the UI, we need the timestamp to actually correspond to
 * the end of the day.
 */
export function maybeShiftEndDateToEndOfDay(activity: ActivityState) {
	const activityClone = { ...activity };

	if (activityGuards.withDates(activityClone)) {
		activityClone.end_date = createDate(activityClone.end_date).endOf("day");
	}

	return activityClone;
}

/** Parse the activity built in ActivityForm to the correct shape so we can make
 * a PUT request to update the activity. */
export function parseUpdatedActivity(activity: Partial<ActivityWithIds>) {
	return activityWithIdsSchema.parse(maybeShiftEndDateToEndOfDay(activity));
}

/** Parses an incoming newActivity (from the ActivityForm component) into
 * something we can actually put in a request body. */
export function parseNewActivity(newActivity: NewActivityInput) {
	return newActivityInputSchema.parse(maybeShiftEndDateToEndOfDay(newActivity));
}
