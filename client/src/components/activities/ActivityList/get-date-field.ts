import { activityGuards } from "@/types/server/activity.guards";
import { formatDate } from "@lib/datetime/format-date";
import type { ActivityWithIds } from "@type/server/activity.types";

export function getDateField({
	type,
	activity
}: {
	type: "start" | "end";
	activity: ActivityWithIds;
}) {
	let field;

	if (type === "start") {
		field = activityGuards.withDates(activity)
			? activity.start_date
			: activity.started_at;
	} else {
		field = activityGuards.withDates(activity) ? activity.end_date : activity.ended_at;
	}

	return field;
}

export function getFormattedDateField({
	type,
	activity,
	short
}: {
	type: "start" | "end";
	activity: ActivityWithIds;
	short?: boolean;
}) {
	const dateField = getDateField({ type, activity });
	return formatDate(dateField, { short });
}
