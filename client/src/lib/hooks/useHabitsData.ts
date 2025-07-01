import { withSyntheticHabitEntries } from "@/components/habits/Habits/synthetic";
import { trpc } from "@/lib/trpc";
import type { TimeWindow } from "@/types/time-window.types";
import { byIdAsList } from "@shared/lib/map";
import type { Habit, HabitWithEntries } from "@shared/lib/schemas/habit";
import type { ById } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export default function useHabitsData() {
	const { data: habitsData } = useQuery(trpc.habits.all.queryOptions());
	const { data: habitEntriesData } = useQuery(trpc.habits.entries.queryOptions());

	const habitsWithEntriesById = useMemo(() => {
		if (!habitsData || !habitEntriesData) return {};

		return Array.from(habitsData.byId.entries()).reduce((acc, [id, habit]) => {
			const entriesForHabit = byIdAsList(habitEntriesData.byId).filter((entry) => {
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
