import { createDate } from "@/lib/datetime/make-date";
import type { Datelike } from "@shared/types/data/utility.types";

export function getLocalHour(date: Datelike) {
	return createDate(date).hour();
}
