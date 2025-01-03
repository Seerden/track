import type { DateTimeField } from "@/types/form.types";

enum DateFields {
	START_DATE = "start_date",
	END_DATE = "end_date",
	STARTED_AT = "started_at",
	ENDED_AT = "ended_at"
}

/**
 * Specifies used and unused datetime fields depending on the value of allDay.
 * Remember, we consider an all-day activity one that has `*_date` fields, and a
 * non-all-day one that has `*_at` fields.
 */
export function designateDateFields(allDay?: boolean): Record<string, DateTimeField> {
	const start = allDay ? DateFields.START_DATE : DateFields.STARTED_AT;
	const end = allDay ? DateFields.END_DATE : DateFields.ENDED_AT;
	const unusedStart = allDay ? DateFields.STARTED_AT : DateFields.START_DATE;
	const unusedEnd = allDay ? DateFields.ENDED_AT : DateFields.END_DATE;
	return { start, end, unusedStart, unusedEnd } as const;
}
