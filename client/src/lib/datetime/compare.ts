import dayjs from "dayjs";
import type { Datelike } from "../../types/date.types";
import { today } from "./make-date";

export function sameDay(one: Datelike, two: Datelike) {
	return dayjs.utc(one).local().isSame(dayjs.utc(two).local(), "day");
}

export function isToday(date: Datelike) {
	return dayjs.utc(date).local().isSame(today(), "day");
}
