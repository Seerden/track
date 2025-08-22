import { withSyntheticHabitEntries } from "@/components/habits/Habits/synthetic";
import { trpc } from "@/lib/trpc";
import type { TimeWindow } from "@/types/time-window.types";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useHabitsData() {
	const { data: habits } = useQuery(trpc.habits.all.queryOptions());

	const getHabitsForTimeWindow = useCallback(
		(timeWindow: TimeWindow): ReturnType<typeof withSyntheticHabitEntries> => {
			if (!habits) {
				return new Map();
			}
			// TODO: filter out habits whose start/end date do not fall within
			// timeWindow.
			// TODO: (unsure if we should do that here) consider disallowing
			// interaction with entries once their timeWindow has passed.
			return withSyntheticHabitEntries(habits, timeWindow);
		},
		[habits]
	);

	return {
		/** The only place where this hook is used, doesn't use this. But can't
		 * hurt to include it in the output anyway. */
		habits,
		getHabitsForTimeWindow,
	};
}
