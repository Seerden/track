import day from "@shared/lib/day";
import { Datelike } from "@shared/lib/schemas/timestamp";
import { Dayjs } from "dayjs";

/**
 * General note: I'm not sure _why_ utc is vital, but dates do not get parsed
 * from the database correctly without it.
 */

// TODO: rename this to now(), use another function for today() and maybe think
// about setting that to start of day.
export function today() {
	return day().utc().local();
}

export function now() {
	return day().utc().local();
}

export function createDate(date: Datelike) {
	// TODO: type-aliasing necessary because of the definition of Datelike, see
	// the note with `timestampSchema`
	return day(date as Dayjs)
		.utc()
		.local();
}

export function createFirstOfTheMonth({ month, year }: { month: number; year: number }) {
	return createDate(new Date(year, month)).startOf("month");
}
