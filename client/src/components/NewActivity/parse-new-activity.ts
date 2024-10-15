import { activityGuards } from "@/types/server/activity.guards";
import { AtLeast } from "@/types/server/utility.types";
import type { DateTimeField } from "@type/form.types";
import { type NewActivity } from "@type/server/activity.types";

/**
 * An activity either has date fields (start_date, end_date) or timestamp fields
 * (started_at, ended_at). This function makes sure that the incoming activity
 * actually satisfies this requirement.
 */
export function parseNewActivity(
	newActivity: AtLeast<Partial<NewActivity>, "user_id">,
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
		"ended_at",
	];

	for (const field of dateFields) {
		if (newActivity[field] === "") {
			delete newActivity[field];
		}
	}

	if (
		!activityGuards.withDates(newActivity) &&
		!activityGuards.withTimestamps(newActivity)
	) {
		throw new Error("Activity must have either date fields or timestamp fields");
	}

	return newActivity;
}

// WIP
function isValidNewActivity(
	newActivity: AtLeast<NewActivity, "user_id">,
): newActivity is NewActivity {
	return (
		newActivity.user_id !== undefined &&
		newActivity.name !== undefined &&
		newActivity.description !== undefined &&
		(activityGuards.withDates(newActivity) ||
			activityGuards.withTimestamps(newActivity))
	);
}
