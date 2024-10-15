import type { Datelike } from "@type/date.types";
import dayjs from "dayjs";

/**
 * General note: I'm not sure _why_ utc is vital, but dates do not get parsed
 * from the database correctly without it.
 */

export function today() {
	return dayjs().local().utc();
}

export function createDate(date: Datelike) {
	return dayjs(date).local().utc();
}
