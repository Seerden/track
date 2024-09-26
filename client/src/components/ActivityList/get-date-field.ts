import dayjs from "dayjs";
import { formatDate } from "../../lib/format-date";
import { ActivityWithIds } from "../../types/server/activity.types";

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

	return dayjs(field);
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
