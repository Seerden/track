import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import { useState } from "react";
import { singleHabitEntryIsDone } from "./entry-is-completed";
import type { HabitEntrySliderProps } from "./HabitEntrySlider";

/** Component hook for HabitEntrySlider.tsx */
export function useHabitEntrySlider({
	habit,
	entry,
	onChangeEnd,
}: Pick<HabitEntrySliderProps, "habit" | "entry" | "onChangeEnd">) {
	const defaultValue = isSynthetic(entry) ? 0 : +entry.value;
	const [sliderValue, setSliderValue] = useState(() => defaultValue); // TODO: do we need to do anything else to fully synchronize this with the entry's value?
	const isDone = singleHabitEntryIsDone({ habit, entry });

	function handleChangeEnd(value: number) {
		onChangeEnd({ input: entry, value: value.toString() });
	}

	function handleNumberInputBlur(e: React.FocusEvent<HTMLInputElement>) {
		const value = +e.target.value
			.replace(habit.goal_unit ? ` ${habit.goal_unit}` : "", "")
			.trim();
		if (isNaN(value)) return;
		setSliderValue(value);
		handleChangeEnd(value);
	}

	return {
		defaultValue,
		sliderValue,
		setSliderValue,
		isDone,
		handleChangeEnd,
		handleNumberInputBlur,
	};
}
