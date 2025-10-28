import {
	type HabitEntry,
	type HabitWithPossiblySyntheticEntries,
	habitEntrySchema,
	type SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import type { Nullable } from "@shared/types/data/utility.types";
import { createDate } from "@/lib/datetime/make-date";
import { extractEntriesForInterval } from "./entries-for-interval";

/** Given an entry and its template habit, determine if the entry is "done".
 * @todo (TRK-93) I made habit be `Partial<HabitWithEntries>` because we only need
 * `goal_type` and `goal`, but for proper usage, we should narrow the type to
 * `Pick<Habit, "goal_type" | "goal">` and update current usage.
 */
export function singleHabitEntryIsDone({
	habit,
	entry,
}: {
	habit: Partial<HabitWithPossiblySyntheticEntries>;
	entry: HabitEntry | SyntheticHabitEntry;
}) {
	if (isSynthetic(entry)) return false;

	switch (habit.goal_type) {
		case "goal":
			// TODO: should refine the habit type so that goal is always defined
			// when goal_type is "goal"
			return !habit.goal ? false : +entry.value >= habit.goal;
		case "checkbox":
			return entry.value === "true";
	}
}

/**
 * This function takes a habit with its entries, looks at the habit's settings and
 * determines, for the given `date` whether the habit's goal was reached on that date.
 *
 * - daily habits: look at the sum of all entry `value`s. if they reach `goal`,
 *   the cell is done.
 * - weekly habits: look at the combined value of all the entries for `date`. if
 *   they reach the goal (regardless of frequency), consider the cell done.
 *   (this doesn't mean the actual habit's goal was reached: for that, we
 *   would use rowIsDone or something, which goes over multiple cells)
 * - monthly and other: for these, I guess cells work the same as weekly habits,
 *   because completion intervals are always linked to a single day.
 *
 *  @todo completion entries should be labeled by date where relevant (need to
 * build UI for this) -- TRK-93: what did I even mean by this?
 * @todo pass `habit` and `entries` as separate args?
 */
export function habitSuccessfulOnDate(
	habitWithEntries: HabitWithPossiblySyntheticEntries,
	date: Datelike
) {
	const { entries, ...habit } = habitWithEntries;

	const entriesForDate = habitEntrySchema
		.array()
		.parse(
			entries.filter(
				(entry) =>
					!isSynthetic(entry) &&
					createDate(entry.date).isSame(createDate(date), "date")
			)
		);

	switch (habit.goal_type) {
		case "checkbox": {
			const successfulEntries = entriesForDate.reduce((acc, entry) => {
				if (entry.value === "true") {
					acc += 1;
				}

				return acc;
			}, 0);
			// TODO: for habits that go e.g. 3x/week, a cell is considered done if
			// there is 1 successful entry on the day. But for habits that go e.g.
			// 3x/2 weeks, is that still true? I think so.
			const frequencyGoal = habit.interval_unit === "day" ? habit.frequency : 1;

			return successfulEntries >= frequencyGoal;
		}
		case "goal": {
			if (habit.frequency > 1 && habit.interval_unit === "day") {
				const successfulEntries = entriesForDate.filter((entry) => {
					// TODO: should really rename this to `singleHabitEntryIsDone` or
					// something
					return singleHabitEntryIsDone({
						habit,
						entry,
					});
				});

				return successfulEntries.length >= habit.frequency;
			} else {
				const totalValueForDate = entriesForDate.reduce((acc, entry) => {
					const valueAsNumber = isNaN(+entry.value) ? 0 : +entry.value;

					return acc + valueAsNumber;
				}, 0);

				if (!habit.goal) {
					return true;
				}

				return totalValueForDate >= habit.goal;
			}
		}
	}
}

// given a habit and all of its entries within the habit-specific interval
// (a given day, week, month)), determine if the goal for that interval
// was met.
// TODO: this only takes into account "per day", "per week", "per month" habits,
// not "per 2 weeks", "per 3 days", etc. Use modified start and end of interval,
// and the combination of habit.interval and habit.interval_unit to accomplish this.
export function habitSuccessfulInInterval(
	habitWithEntries: HabitWithPossiblySyntheticEntries,
	date: Nullable<Datelike>
) {
	if (!date) return null;

	const { entries, ...habit } = habitWithEntries;

	// get the start and end dates for the interval; for a "day" interval, use
	// the date, for other intervals, use start and end dates
	// TODO: make this a separate helper (filterEntriesForInterval)
	const entriesForInterval = extractEntriesForInterval(
		entries,
		habit.interval_unit,
		date
	);

	const successfulEntryCount = entriesForInterval.reduce((acc, entry) => {
		const isSuccessful =
			!isSynthetic(entry) && singleHabitEntryIsDone({ habit, entry });

		if (isSuccessful) {
			acc += 1;
		}

		return acc;
	}, 0);

	return successfulEntryCount >= habit.frequency;
}
