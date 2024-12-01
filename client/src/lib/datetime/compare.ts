import type { Dayjs } from "dayjs";
import { today } from "./make-date";

export function sameDay(one: Dayjs, two: Dayjs) {
	return one.isSame(two, "day");
}

export function isToday(date: Dayjs) {
	return date.isSame(today(), "day");
}
