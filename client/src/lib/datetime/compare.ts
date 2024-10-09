import dayjs from "dayjs";
import type { Datelike } from "../../types/date.types";

export function sameDay(one: Datelike, two: Datelike) {
	return dayjs.utc(one).local().isSame(dayjs.utc(two).local(), "day");
}
