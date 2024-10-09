import dayjs from "dayjs";
import { Datelike } from "../../types/date.types";

/**
 * General note: I'm not sure _why_ utc is vital, but dates do not get parsed
 * from the database correctly without it.
 */

export function today() {
	return dayjs.utc().local();
}

export function localDate(date: Datelike) {
	return dayjs.utc(date).local();
}
