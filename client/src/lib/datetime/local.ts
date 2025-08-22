import type { Datelike } from "@shared/lib/schemas/timestamp";
import { createDate } from "@/lib/datetime/make-date";

export function getLocalHour(date: Datelike) {
	return createDate(date).hour();
}
