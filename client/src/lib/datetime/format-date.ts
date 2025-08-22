import type { Datelike } from "@shared/lib/schemas/timestamp";
import type { Dayjs } from "dayjs";
import { createDate } from "./make-date";

// Format a date to year-month-date hh:mm (and optionally :ss)
export function formatDate(
	date: Datelike,
	{ short }: { short?: boolean } = {}
): string {
	const d = createDate(date);
	return d.format(`YYYY-MM-DD HH:mm${!short ? ":ss" : ""}`);
}

/**
 * Format a number (index, presumably from 0-23) to HH:mm string.
 * TODO: is there a dayjs function for this?
 */
export function formatHour(
	index: number // index 0 is 12am, 1 is 1am, 12 is 12pm, 23 is 11pm, etc
) {
	if (index < 0 || index > 23) return "";

	return `${index < 10 ? "0" : ""}${index}:00`;
}

export function formatToMonthAndYear(date: Datelike): string {
	const d = createDate(date);
	return d.format("MMMM YYYY");
}

/** Parse a dayjs object to HH:mm or HHmm depending on the value of `separator`. */
export function formatToHHmm(date: Dayjs, separator = true): string {
	return date.format(`HH${separator ? ":" : ""}mm`);
}

export function formatToYearMonthDay(date: Dayjs): string {
	return date.format("YYYY-MM-DD");
}
