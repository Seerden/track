import type { Datelike } from "@t/data/utility.types";
import dayjs from "dayjs";

/**
 * General note: I'm not sure _why_ utc is vital, but dates do not get parsed
 * from the database correctly without it.
 */

// TODO: rename this to now(), use another function for today() and maybe think
// about setting that to start of day.
export function today() {
	return dayjs().utc().local();
}

export function now() {
	return dayjs().utc().local();
}

export function createDate(date: Datelike) {
	return dayjs(date).utc().local();
}

export function createFirstOfTheMonth({ month, year }: { month: number; year: number }) {
	return createDate(new Date(year, month)).startOf("month");
}
