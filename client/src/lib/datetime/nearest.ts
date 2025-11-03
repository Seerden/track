import type { Datelike } from "@shared/lib/schemas/timestamp";
import { createDate } from "./make-date";

export function nearestNonPastHour(date: Datelike) {
	const dateDayjs = createDate(date);

	if (dateDayjs.minute() === 0) {
		return dateDayjs.startOf("hour");
	}
	return createDate(date).startOf("hour").add(1, "hour");
}
