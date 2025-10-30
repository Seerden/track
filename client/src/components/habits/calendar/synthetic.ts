import { isNullish } from "@shared/lib/is-nullish";
import type {
	HabitWithPossiblySyntheticEntries,
	PossiblySyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import type { Nullable } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
import { createDate } from "@/lib/datetime/make-date";
import { makeSyntheticEntry } from "../Habits/synthetic";

/** Compute the number of _real_ entries required for successful habit
 * completion on a given day, for the specific use-case of the habit calendar
 * (which differs in business logic from the completions in Today etc.) */
export function realEntryThreshold(
	habit: HabitWithPossiblySyntheticEntries,
	date: Dayjs
) {
	if (
		date.isBefore(createDate(habit.start_timestamp), "date") ||
		(habit.end_timestamp &&
			date.isAfter(createDate(habit.end_timestamp), "date"))
	) {
		return 0;
	}

	switch (habit.interval_unit) {
		case "day": {
			return habit.frequency;
		}
		// TODO (TRK-93, TRK-242) Weekly, monthly, [yearly: not yet implemented]
		// should assume a single entry per day. Schemes like 20x/week are
		// exceptions that we don't take into account specifically.
		default:
			return 1;
	}
}

export function withSyntheticEntriesForDayCell(
	habitWithEntries: HabitWithPossiblySyntheticEntries,
	day: Nullable<Datelike>
) {
	if (isNullish(day)) return habitWithEntries.entries;

	const { entries, ...habit } = habitWithEntries;

	const realEntriesForDate = entries.filter(
		(entry) =>
			!isSynthetic(entry) &&
			createDate(entry.date).isSame(createDate(day), "date")
	);
	const expectedRealEntryCount = realEntryThreshold(
		habitWithEntries,
		createDate(day)
	);

	const existingIndices = new Set(realEntriesForDate.map((e) => e.index));
	const missingIndices = Array.from(
		{ length: expectedRealEntryCount },
		(_, i) => i
	).filter((i) => !existingIndices.has(i));

	const withSynthetics: PossiblySyntheticHabitEntry[] = [
		...realEntriesForDate,
		...missingIndices.map((index) =>
			makeSyntheticEntry({ habit, index, date: day })
		),
	].sort((a, b) => a.index - b.index);

	const finalEntry = withSynthetics.at(-1);

	const shouldAppendSynthetic =
		!finalEntry ||
		(!isSynthetic(finalEntry) &&
			((habit.goal_type === "checkbox" && finalEntry.value === "true") ||
				(habit.goal_type === "goal" && +finalEntry.value >= habit.goal)));

	if (shouldAppendSynthetic) {
		withSynthetics.push(
			makeSyntheticEntry({
				habit,
				index: withSynthetics.length,
				date: day,
			})
		);
	}

	return withSynthetics satisfies PossiblySyntheticHabitEntry[];
}
