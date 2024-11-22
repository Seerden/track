import { createDate } from "@/lib/datetime/make-date";
import { activityGuards } from "@t/data/activity.guards";
import type { ActivityWithIds } from "@t/data/activity.types";
import { type NewActivity } from "@t/data/activity.types";
import { hasValidUserId } from "@t/data/user-id.guards";

/** If `activity` is an all-day activity (which we determine by seeing if it's
 * an activity withDates), set end_date to the end of that day.
 * @usage we need to do this before submitting a new or updated activity,
 * because in this case the UI contains a date-input which only takes a date,
 * but for elsewhere in the UI, we need the timestamp to actually correspond to
 * the end of the day.
 *  */
export function maybeShiftEndDateToEndOfDay(
	activity: Partial<ActivityWithIds | NewActivity>
) {
	if (activityGuards.withDates(activity)) {
		activity.end_date = createDate(activity.end_date).endOf("day");
	}
}

/** Validation checks that to-post and to-put activities have in common go in here. */
export function maybeThrowOnInvalidActivity(
	activity: Partial<ActivityWithIds | NewActivity>
) {
	if (!hasValidUserId(activity)) {
		throw new Error("Activity must have a valid user idd");
	}

	if (!activityGuards.withDates(activity) && !activityGuards.withTimestamps(activity)) {
		throw new Error("Activity must have either date fields or timestamp fields");
	}
}

/** Parse the activity built in ActivityForm to the correct shape so we can make
 * a PUT request to update the activity. */
export function parseUpdatedActivity(activity: Partial<ActivityWithIds>) {
	if (!activity.activity_id || isNaN(activity.activity_id))
		throw new Error("Activity must have a valid activity id");

	maybeThrowOnInvalidActivity(activity);
	maybeShiftEndDateToEndOfDay(activity);

	return activity as ActivityWithIds;
}

/** Parses an incoming newActivity (from the ActivityForm component) into
 * something we can actually put in a request body. */
export function parseNewActivity(newActivity: Partial<NewActivity>): NewActivity {
	const requiredFields: (keyof NewActivity)[] = ["user_id", "name"];
	for (const field of requiredFields) {
		if (newActivity[field] === undefined) {
			throw new Error(`New activity is missing required field: ${field}`);
		}
	}

	maybeThrowOnInvalidActivity(newActivity);
	maybeShiftEndDateToEndOfDay(newActivity);

	return newActivity as NewActivity;
}
