import type { DateTimePickerProps } from "@/components/activities/ActivityForm/datetime-picker.types";
import { createDate } from "@/lib/datetime/make-date";
import type { Maybe } from "@t/data/utility.types";
import type { Dayjs } from "dayjs";

export function extractActiveDateTimeValues(
	defaultValues: DateTimePickerProps["defaultValues"]
): Maybe<{ start: Dayjs; end: Dayjs }> {
	if (!defaultValues) return null;

	if (defaultValues.start_date && defaultValues.end_date) {
		return {
			start: createDate(defaultValues.start_date),
			end: createDate(defaultValues.end_date)
		};
	} else if (defaultValues.started_at && defaultValues.ended_at) {
		return {
			start: createDate(defaultValues.started_at),
			end: createDate(defaultValues.ended_at)
		};
	}
}

export function isAllDay(defaultValues: DateTimePickerProps["defaultValues"]) {
	if (!defaultValues) return false;

	return Boolean(defaultValues.start_date && defaultValues.end_date);
}
