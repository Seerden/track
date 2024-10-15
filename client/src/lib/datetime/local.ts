import type { Datelike } from "@/types/date.types";
import dayjs from "dayjs";

export function getLocalHour(date: Datelike) {
	return dayjs(date).utc().local().hour();
}
