import { byIdAsList, mapById } from "@shared/lib/map";
import type { Nullable } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useCallback, useMemo } from "react";
import { tagFilterAtom } from "@/components/activities/ActivityFilter/tag-filter.atom";
import { withSyntheticHabitEntries } from "@/components/habits/Habits/synthetic";
import { filterByTags } from "@/components/tags/TagFilter/filter-tags";
import { trpc } from "@/lib/trpc";
import type { TimeWindow } from "@/types/time-window.types";
import { timeWindowAtom } from "../state/time-window.state";

export default function useHabitsData() {
	const tagFilter = useAtomValue(tagFilterAtom);
	const timeWindow = useAtomValue(timeWindowAtom);
	const { data: habitsData } = useQuery(trpc.habits.all.queryOptions());

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

	const filteredHabits: Nullable<typeof habits> = useMemo(() => {
		return mapById(filterByTags(byIdAsList(habits), tagFilter), "habit_id");
	}, [habits, tagFilter]);

	// NOTE (TRK-265) it's very important that this returns the habit from habitsData, and
	// not a filtered one, or one with filtered entries, because there is
	// functionality that relies on _all_ entries being present here.
	function getHabitById(id: string) {
		return habitsData?.get(id);
	}

	return {
		habits: filteredHabits,
		/** The only place where this hook is used, doesn't use this. But can't
		 * hurt to include it in the output anyway. */
		habitsData,
		getHabitsForTimeWindow,
		getHabitById,
	};
}
