import { DateTimeField } from "@type/form.types";
import { NewActivity } from "@type/server/activity.types";

export function parseNewActivity(newActivity: Partial<NewActivity>): NewActivity {
	if (!newActivity.user_id) {
		throw new Error("user_id is required");
	}

	const dateFields: DateTimeField[] = [
		"started_at",
		"ended_at",
		"start_date",
		"end_date",
	];
	for (const field of dateFields) {
		if (newActivity[field] === "") {
			delete newActivity[field];
		}
	}

	return newActivity as NewActivity;
}
