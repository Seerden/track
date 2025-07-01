import { createDate } from "@/lib/datetime/make-date";
import { Datelike } from "@shared/lib/schemas/timestamp";

export function getLocalHour(date: Datelike) {
	return createDate(date).hour();
}
