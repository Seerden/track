import type { TimeWindow } from "@/types/time-window.types";
import { createDate, now } from "./make-date";
import { nearestNonPastHour } from "./nearest";

export function defaultTimeWindowAwareStart(timeWindow: TimeWindow) {
	const isToday = createDate(timeWindow.startDate).isSame(now(), "day");

	return nearestNonPastHour(
		isToday ? now() : createDate(timeWindow.startDate).set("hour", 12)
	);
}
