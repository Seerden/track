import type { Datelike } from "@type/date.types";
import dayjs from "dayjs";
import { today } from "./make-date";

export function sameDay(one: Datelike, two: Datelike) {
	return dayjs(one).local().utc().isSame(dayjs(two).local().utc(), "day");
}

export function isToday(date: Datelike) {
	return dayjs(date).local().utc().isSame(today(), "day");
}
