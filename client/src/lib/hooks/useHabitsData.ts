import { withSyntheticHabitEntries } from "@/components/habits/Habits/synthetic";
import { trpc } from "@/lib/trpc";
import type { TimeWindow } from "@/types/time-window.types";
import { byIdAsList } from "@shared/lib/map";
import type { Habit, HabitWithEntries } from "@shared/lib/schemas/habit";
import type { ById } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export default function useHabitsData() {
	const { data: habits } = useQuery(trpc.habits.all.queryOptions());
	const { data: habitEntries } = useQuery(trpc.habits.entries.queryOptions());

	// TODO: rename to habitsWithEntries
	// TODO: rework this. Definitely just use a Map) and then getHabit becomes
	// obsolete. I would consider a single query (maybe implement timeWindow
	// filters on the habits and habitEntries queries), but we want to build the
	// synthetic entries client-side, so we have to do some stuff in here
	// instead of in the server-side trpc resolver.
	const habitsWithEntriesById = useMemo(() => {
		if (!habits || !habitEntries) return {};

		return Array.from(habits.entries()).reduce((acc, [id, habit]) => {
			const entriesForHabit = byIdAsList(habitEntries).filter((entry) => {
				return habit.entry_ids.includes(entry.habit_entry_id);
			});
			acc[+id] = Object.assign(habit, { entries: entriesForHabit });

			return acc;
		}, {} as ById<HabitWithEntries>);
	}, [habits, habitEntries]);

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
