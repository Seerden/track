import type { DateTimePickerProps } from "@/components/activities/ActivityForm/datetime-picker.types";
import { createDate } from "@/lib/datetime/make-date";
import type { Maybe, StartAndEnd } from "@shared/types/data/utility.types";

/** If `defaultValues` is given, this function returns a StartAndEnd object that
 * extracts the relevant datetime fields from it.
 * @usage to be used as initial state for default values for date-time picker. */
export function maybeGetDefaultStartAndEnd(
	defaultValues: DateTimePickerProps["defaultValues"]
): Maybe<StartAndEnd> {
	if (!defaultValues) return null;

	// TODO: I would like to use the withDates/withTimestamps typeguards here,
	// but those expect a full activity object, not just the default values.
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

/** The abstraction we generally use to distinguish between an all-day and a
 * non-all-day activity is whether the `*_date` fields are used, and not the
 * `*_at` ones. This function uses that to check whether the specified default
 * values for the DateTimePicker correspond to an all-day activity. */
export function isAllDay(defaultValues: DateTimePickerProps["defaultValues"]) {
	if (!defaultValues) return false;

	return Boolean(defaultValues.start_date && defaultValues.end_date);
}
