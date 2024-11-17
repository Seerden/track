import { createDate } from "@/lib/datetime/make-date";
import type { Datelike } from "@/types/date.types";

export function getLocalHour(date: Datelike) {
	return createDate(date).hour();
}
