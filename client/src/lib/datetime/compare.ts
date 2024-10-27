import type { Datelike } from "@type/date.types";
import dayjs from "dayjs";
import { today } from "./make-date";

export function sameDay(one: Datelike, two: Datelike) {
	return dayjs(one).utc().local().isSame(dayjs(two).utc().local(), "day");
}

export function isToday(date: Datelike) {
	return dayjs(date).utc().local().isSame(today(), "day");
}
