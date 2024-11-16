import { withSyntheticHabitEntries } from "@/components/habits/HabitEntryItem/synthetic";
import useHabitEntriesQuery from "@/lib/query/habits/useHabitEntriesQuery";
import useHabitsQuery from "@/lib/query/habits/useHabitsQuery";
import type { Habit, HabitWithEntries } from "@/types/server/habit.types";
import type { ById } from "@/types/server/utility.types";
import type { TimeWindow } from "@/types/time-window.types";
import { useCallback, useMemo } from "react";

export default function useHabitsData() {
	const { data: habitsData } = useHabitsQuery();
	const { data: habitEntriesData } = useHabitEntriesQuery();

	const habitsWithEntriesById = useMemo(() => {
		if (!habitsData || !habitEntriesData) return {};

		return Object.entries(habitsData.byId).reduce((acc, [id, habit]) => {
			const entriesForHabit = Object.values(habitEntriesData.byId).filter((entry) => {
				return habit.entry_ids.includes(entry.habit_entry_id);
			});
			acc[+id] = Object.assign(habit, { entries: entriesForHabit });

			return acc;
		}, {} as ById<HabitWithEntries>);
	}, [habitsData, habitEntriesData]);

	const getHabitsForTimeWindow = useCallback(
		(timeWindow: TimeWindow) => {
			// TODO: filter out habits whose start/end date do not fall within
			// timeWindow.
			// TODO: (unsure if we should do that here) consider disallowing
			// interaction with entries once their timeWindow has passed.
			return withSyntheticHabitEntries(habitsWithEntriesById, timeWindow);
		},
		[habitsWithEntriesById]
	);

	const getHabit = useCallback(
		({ habit_id }: Pick<Habit, "habit_id">) => {
			return habitsWithEntriesById[habit_id];
		},
		[habitsWithEntriesById]
	);

	return { habitsWithEntriesById, getHabit, getHabitsForTimeWindow };
}
