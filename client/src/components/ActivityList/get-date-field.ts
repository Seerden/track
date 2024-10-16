import { formatDate } from "@lib/datetime/format-date";
import type { ActivityWithIds } from "@type/server/activity.types";

export function getDateField({
	type,
	activity,
}: {
	type: "start" | "end";
	activity: ActivityWithIds;
}) {
	let field;

	if (type === "start") {
		field = activity.start_date ?? activity.started_at;
	} else {
		field = activity.end_date ?? activity.ended_at;
	}

	// `field` is always defined because an activity either has date fields or
	// timestamps. TODO: refine the activity type to reflect this
	return field!;
}

export function getFormattedDateField({
	type,
	activity,
	short,
}: {
	type: "start" | "end";
	activity: ActivityWithIds;
	short?: boolean;
}) {
	const dateField = getDateField({ type, activity });
	return formatDate(dateField, { short });
}
