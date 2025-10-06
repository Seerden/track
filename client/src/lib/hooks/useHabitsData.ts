import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { withSyntheticHabitEntries } from "@/components/habits/Habits/synthetic";
import { trpc } from "@/lib/trpc";
import type { TimeWindow } from "@/types/time-window.types";
import { timeWindowAtom } from "../state/time-window.state";

export default function useHabitsData() {
	const { data: habitsData } = useQuery(trpc.habits.all.queryOptions());
	const timeWindow = useAtomValue(timeWindowAtom);

	const getHabitsForTimeWindow = useCallback(
		(timeWindow: TimeWindow): ReturnType<typeof withSyntheticHabitEntries> => {
			if (!habitsData) {
				return new Map();
			}
			// TODO: filter out habits whose start/end date do not fall within
			// timeWindow.
			// TODO: (unsure if we should do that here) consider disallowing
			// interaction with entries once their timeWindow has passed.
			return withSyntheticHabitEntries(habitsData, timeWindow);
		},
		[habitsData]
	);

	const habits = getHabitsForTimeWindow(timeWindow);

	function getHabitById(id: string) {
		return habitsData?.get(id);
	}

	return {
		habits,
		/** The only place where this hook is used, doesn't use this. But can't
		 * hurt to include it in the output anyway. */
		habitsData,
		getHabitsForTimeWindow,
		getHabitById,
	};
}
