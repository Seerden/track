import dayjs, { Dayjs } from "dayjs";

type Datelike = Date | string | number | Dayjs;

// Format a date to year-month-date hh:mm (and optionally :ss)
export function formatDate(date: Datelike, { short }: { short?: boolean } = {}): string {
	const d = dayjs.utc(date); // TODO: honestly I'm not sure why we need to use utc here, but it gets parsed incorrectly if we don't
	return d.format(`YYYY-MM-DD HH:mm${!short ? ":ss" : ""}`);
}

/**
 * Format a number (index, presumably from 0-23) to HH:mm(:ss) syntax.
 * TODO: is there a dayjs function for this?
 * TODO: move this to a helper file.
 */
export function formatHour(
	index: number, // index 0 is 12am, 1 is 1am, 12 is 12pm, 23 is 11pm, etc
) {
	return `${index < 10 ? "0" : ""}${index}:00`;
}
