import dayjs, { Dayjs } from "dayjs";

type Datelike = Date | string | number | Dayjs;

// Format a date to year-month-date hh:mm (and optionally :ss)
export function formatDate(date: Datelike, { short }: { short?: boolean } = {}): string {
	const d = dayjs.utc(date); // TODO: honestly I'm not sure why we need to use utc here, but it gets parsed incorrectly if we don't
	return d.format(`YYYY-MM-DD HH:mm${!short ? ":ss" : ""}`);
}
