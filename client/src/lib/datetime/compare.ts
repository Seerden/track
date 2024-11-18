import type { Datelike } from "@t/data/utility.types";
import { createDate, today } from "./make-date";

export function sameDay(one: Datelike, two: Datelike) {
	return createDate(one).isSame(createDate(two), "day");
}

export function isToday(date: Datelike) {
	return createDate(date).isSame(today(), "day");
}
