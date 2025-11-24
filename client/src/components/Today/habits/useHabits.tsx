import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { DeepValue, MapById } from "@shared/types/data/utility.types";
import { atom, useAtom, useAtomValue } from "jotai";
import { type ChangeEvent, useState } from "react";
import {
	habitSuccessfulInInterval,
	habitSuccessfulOnDate,
} from "@/components/habits/Habits/entry-is-completed";
import useHabitsData from "@/lib/hooks/useHabitsData";
import { useToggle } from "@/lib/hooks/useToggle";
import { timeWindowAtom } from "@/lib/state/time-window.state";

const HABIT_FILTER = {
	ALL: "all",
	TODAY: "completed-today",
	INTERVAL: "completed-interval",
} as const;

export type HabitFilter = DeepValue<typeof HABIT_FILTER>;

export const habitFilterAtom = atom<HabitFilter>(HABIT_FILTER.ALL);

export function useHabits(habits: MapById<HabitWithPossiblySyntheticEntries>) {
	const habitsList = [...habits.values()];
	// TODO: should probably use a useHabitsDataById(id) here for performance
	// reasons.
	// and then move the visibility logic into Habit, where we can return null if
	// should be hidden.
	const { getHabitById } = useHabitsData();

	const [habitFilter, setHabitFilter] = useAtom(habitFilterAtom);
	const [nameFilter, setNameFilter] = useState("");
	const [[showFilter, setShowFilter], toggleFilter] = useToggle(false);
	const timeWindow = useAtomValue(timeWindowAtom);

	// TODO: need to get habit completion state from a hook:
	// - we use habitSuccessfulOnDate/habitSuccessfulIninterval, but these need
	//   access to all the relevant entries, which we do not do yet for Habits.
	//   We _do_ do that in HabitCalendar though, so however we end up
	//   implementing it, we need to share the code between this and that.

	const filteredHabits = habitsList.filter((h) => {
		const date = timeWindow.startDate;

		const withAllEntries = getHabitById(h.habit_id);
		// should throw an error if the habit doesn't exist
		if (!withAllEntries) return false;

		let show: boolean | null;
		switch (habitFilter) {
			case HABIT_FILTER.ALL: {
				show = true;
				break;
			}
			case HABIT_FILTER.TODAY: {
				show = !habitSuccessfulOnDate(withAllEntries, date);
				break;
			}
			case HABIT_FILTER.INTERVAL: {
				show = !habitSuccessfulInInterval(withAllEntries, date);
				break;
			}
		}

		if (!show) {
			return false;
		}

		if (!nameFilter?.length) return true;

		return h.name.toLowerCase().includes(nameFilter.toLowerCase());
	});

	function handleNameFilterChange(e: ChangeEvent<HTMLInputElement>) {
		setNameFilter(e.target.value);
	}

	return {
		showFilter,
		setShowFilter,
		habitFilter,
		HABIT_FILTER,
		nameFilter,
		toggleFilter,
		setHabitFilter,
		habitsList,
		filteredHabits,
		handleNameFilterChange,
	} as const;
}
