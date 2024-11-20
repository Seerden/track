import { createDate } from "@/lib/datetime/make-date";
import type { DateTimeField } from "@/types/form.types";
import { activityGuards } from "@t/data/activity.guards";
import { type NewActivity } from "@t/data/activity.types";
import type { AtLeast } from "@t/data/utility.types";

/**
 * An activity either has date fields (start_date, end_date) or timestamp fields
 * (started_at, ended_at). This function makes sure that the incoming activity
 * actually satisfies this requirement.
 */
export function parseNewActivity(
	newActivity: AtLeast<Partial<NewActivity>, "user_id">
): NewActivity {
	const requiredFields: (keyof NewActivity)[] = ["user_id", "name"];

	for (const field of requiredFields) {
		if (newActivity[field] === undefined) {
			throw new Error(`New activity is missing required field: ${field}`);
		}
	}

	const dateFields: DateTimeField[] = [
		"start_date",
		"end_date",
		"started_at",
		"ended_at"
	];

	for (const field of dateFields) {
		if (newActivity[field] === "") {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete newActivity[field];
		}
	}

	if (
		!activityGuards.withDates(newActivity) &&
		!activityGuards.withTimestamps(newActivity)
	) {
		throw new Error("Activity must have either date fields or timestamp fields");
	}

	// Make sure the `end` field is set to end of day. TODO: this should
	// generically be handled in DateTimePicker, but currently only newActivity
	// uses that, so doing it here works fine for now.
	if (activityGuards.withDates(newActivity)) {
		newActivity.end_date = createDate(newActivity.end_date).endOf("day");
	}

	return newActivity as NewActivity;
}
