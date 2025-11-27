import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { MapById } from "@shared/types/data/utility.types";
import { useAtom, useAtomValue } from "jotai";
import { type ChangeEvent, useState } from "react";
import {
	habitSuccessfulInInterval,
	habitSuccessfulOnDate,
} from "@/components/habits/Habits/entry-is-completed";
import {
	HABIT_FILTER,
	type HabitFilter,
	habitFilterAtom,
	habitSelectionRadioOptions,
} from "@/components/Today/habits/habit-filter";
import useHabitsData from "@/lib/hooks/useHabitsData";
import { useToggle } from "@/lib/hooks/useToggle";
import { timeWindowAtom } from "@/lib/state/time-window.state";

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

	const headerProps = {
		checked: (value: string | undefined) => habitFilter === value,
		onPopoverClose: () => setShowFilter(false),
		onRadioValueChange: (value: string | undefined) =>
			setHabitFilter?.(value as HabitFilter),
		onSearchValueChange: handleNameFilterChange,
		popoverOpened: showFilter,
		radioGroupLabel: "Habit filter",
		radioOptions: habitSelectionRadioOptions,
		radioValue: habitFilter,
		searchValue: nameFilter,
		title: "Habits",
		togglePopover: toggleFilter,
		triggerAriaLabel: "Toggle habit filter",
		triggerTooltipOff: "Showing all habits",
		triggerTooltipOn: "Filter applied to habits",
		labelOn: habitFilter !== HABIT_FILTER.ALL || !!nameFilter.length,
	};

	return {
		showFilter,
		habitsList,
		filteredHabits,
		headerProps,
	} as const;
}
