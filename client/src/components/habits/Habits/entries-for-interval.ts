import type { PossiblySyntheticHabitEntry } from "@shared/lib/schemas/habit";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import type { IntervalUnit } from "@shared/types/data/utility.types";
import { createDate } from "@/lib/datetime/make-date";

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
