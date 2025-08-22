import type { Dayjs } from "dayjs";

/** Helper for useCalendar. */
export function createMonthAndYear(date: Dayjs) {
	return {
		month: date.month(),
		year: date.year(),
	};
}

/** Helper for useMonthPicker. */
export function createMonthValue(date: Dayjs) {
	return new Date(date.year(), date.month(), 1); // note: MonthPicker expects Date, so don't use our dayjs helpers
}
