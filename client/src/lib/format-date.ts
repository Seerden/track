import dayjs, { Dayjs } from "dayjs";

type Datelike = Date | string | number | Dayjs;

// format a dayjs date to year-month-date hh:mm:ss
export function formatDate(date: Datelike): string {
	const d = dayjs(date);
	return d.format("YYYY-MM-DD HH:mm:ss");
}
