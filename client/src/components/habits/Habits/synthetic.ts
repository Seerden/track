import { mapById } from "@shared/lib/map";
import type {
	Habit,
	HabitEntryInput,
	HabitWithEntries,
	HabitWithPossiblySyntheticEntries,
	PossiblySyntheticHabitEntry,
	SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import type { MapById } from "@shared/types/data/utility.types";
import { createDate } from "@/lib/datetime/make-date";
import type { TimeWindow } from "@/types/time-window.types";

export function daysInInterval(interval: TimeWindow["intervalUnit"]) {
	switch (interval) {
		case "day":
			return 1;
		case "week":
			return 7;
		case "month":
			return 30;
		case "year":
			return 365;
	}
}

/** Given a habit and a timescale, find out what the minimum number of entries
 * should be.
 * @example: an activity that should be done 3 times a week, displayed on a
 * 'week' timescale, should have 3 entries.
 * @example an activity that should be done 2 times a week, displayed on a 'day' timescale,
 * should have 1 entry (TODO: actually, 1 at most, if we're on wednesday and there's
 * already 2 completed entries, we don't need to display any new entries.)
 **/
function expectedEntryCount(timeWindow: TimeWindow, habit: Habit) {
	// the number of days in the displayed interval. for now, we just assume only
	// a single day/week/month/year is displayed.
	// TODO: handle the case where we display multiple days/weeks/months/years
	const dayCount = daysInInterval(timeWindow.intervalUnit);

	// number of expected habit completions for the given habit settings and the given displayed interval
	const habitCompletionsPerDay =
		habit.frequency /
		habit.interval /
		daysInInterval(habit.interval_unit as TimeWindow["intervalUnit"]);
	return Math.ceil(dayCount * habitCompletionsPerDay);
}

export function makeSyntheticEntry({
	habit,
	index,
	date,
}: {
	habit: Habit;
	index: number;
	date: Datelike;
}): SyntheticHabitEntry {
	return {
		created_at: new Date(),
		date,
		habit_id: habit.habit_id,
		index,
		synthetic: true,
	};
}

/**
 * For UI purposes, this function adds synthetic habit entries to each habit in
 * `habits`, if there are not enough actual entries (yet) for the given `habit`
 * and `timeWindow`. */
export function withSyntheticHabitEntries(
	habits: MapById<HabitWithEntries>,
	timeWindow: TimeWindow
): MapById<HabitWithPossiblySyntheticEntries> {
	const habitsWithSyntheticEntries = [...habits.values()].map((habit) => {
		const expectedCount = expectedEntryCount(timeWindow, habit);

		const entries: Array<PossiblySyntheticHabitEntry> = structuredClone(
			habit.entries
		).filter((entry) => {
			const entryDate = createDate(entry.date);
			const windowStart = createDate(timeWindow.startDate);
			const windowEnd = createDate(timeWindow.endDate);
			return !entryDate.isBefore(windowStart) && !entryDate.isAfter(windowEnd);
		});

		const existingIndices = new Set(entries.map((e) => e.index));
		const expectedIndices = new Set(
			Array.from({ length: expectedCount }, (_, i) => i)
		);
		const missingIndices = Array.from(expectedIndices).filter(
			(i) => !existingIndices.has(i)
		);

		for (const index of missingIndices) {
			const syntheticEntry = makeSyntheticEntry({
				habit,
				index,
				// TODO: for now, using timeWindow.startDate probably works well
				// enough, but I think it's still not perfect for the case where
				// a user adds an entry in retrospect. Maybe we should just
				// disallow that altogether.
				date: timeWindow.startDate,
			});
			entries.push(syntheticEntry);
		}

		return Object.assign({}, habit, {
			entries: entries.sort((a, b) => a.index - b.index),
		});
	});

	// TODO (TRK-144): could consider altering the habits query to consider the time
	// window, similar to the activities query
	const filteredHabits = habitsWithSyntheticEntries.filter((habit) => {
		const endsBeforeTimeWindow =
			habit.end_timestamp &&
			createDate(habit.end_timestamp).isBefore(timeWindow.startDate);
		const beginsAfterTimeWindow =
			habit.start_timestamp &&
			createDate(habit.start_timestamp).isAfter(timeWindow.endDate);
		return !endsBeforeTimeWindow && !beginsAfterTimeWindow;
	});

	return mapById(filteredHabits, "habit_id");
}

/** This function turns a SyntheticHabitEntry into a HabitEntryInput to allow
 * us to insert it as a real entry into the database. Note that it only becomes
 * a HabitEntry after it's been inserted into the database, so we cannot use the
 * result of this function in the UI anywhere (because it's missing fields that
 * a real habit entry has, like `user_id`). */
export function syntheticToReal({
	entry,
	value,
}: {
	entry: SyntheticHabitEntry;
	value: HabitEntryInput["value"];
}): HabitEntryInput {
	return {
		date: entry.date,
		habit_id: entry.habit_id,
		index: entry.index,
		value,
	};
}
