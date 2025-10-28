import type { PossiblySyntheticHabitEntry } from "@shared/lib/schemas/habit";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import type { IntervalUnit } from "@shared/types/data/utility.types";
import { createDate } from "@/lib/datetime/make-date";

/** Filter out entries that do not fall in `interval`; for a "day" interval, use
 * the date as an "anchor". For other intervals, we use start and end dates. */
export function extractEntriesForInterval(
	entries: PossiblySyntheticHabitEntry[],
	intervalUnit: IntervalUnit,
	date: Datelike
) {
	const dateDayjs = createDate(date);

	const entriesForInterval = entries.filter((entry) => {
		const entryDateDayjs = createDate(entry.date);

		if (intervalUnit === "day") {
			return entryDateDayjs.isSame(dateDayjs, "date");
		} else {
			const startOfInterval = dateDayjs.startOf(intervalUnit);
			const endOfInterval = dateDayjs.endOf(intervalUnit);

			return (
				!entryDateDayjs.isBefore(startOfInterval) &&
				!entryDateDayjs.isAfter(endOfInterval)
			);
		}
	});

	return entriesForInterval;
}
