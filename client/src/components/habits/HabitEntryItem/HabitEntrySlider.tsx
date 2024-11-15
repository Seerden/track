import type { HabitEntryUpdateMutationFunction } from "@/lib/query/habits/useHabitEntryMutation";
import { isSynthetic } from "@/types/server/habit-entry.guards";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@/types/server/habit.types";
import type { SliderProps } from "@mantine/core";
import { Slider } from "@mantine/core";
import { useState } from "react";

const sliderProps: SliderProps = {
	labelAlwaysOn: false,
	showLabelOnHover: false,
	size: "sm",
	thumbSize: 15
};

type HabitEntrySliderProps = {
	habit: HabitWithIds;
	entry: HabitEntry | SyntheticHabitEntry;
	onChangeEnd: HabitEntryUpdateMutationFunction;
};

export default function HabitEntrySlider({
	habit,
	entry,
	onChangeEnd
}: HabitEntrySliderProps) {
	const defaultValue = isSynthetic(entry) ? 0 : +entry.value;
	const [sliderValue, setSliderValue] = useState(() => defaultValue); // TODO: do we need to do anything else to fully synchronize this with the entry's value?

	function handleChangeEnd(value: number) {
		onChangeEnd({ input: entry, value: value.toString() });
	}

	if (habit.goal_type !== "goal") return;

	return (
		<label>
			<span>
				{sliderValue} {habit.goal_unit}
			</span>
			<Slider
				{...sliderProps}
				defaultValue={defaultValue}
				min={0} // TODO: is this always the correct minimum value?
				max={habit.goal ?? 1} // TODO: habit.goal should always exist if goal_type is "goal"
				step={1}
				label={(value) => `${value} ${habit.goal_unit}`}
				// TODO: color and styling are work in progress that is out of scope
				// for https://github.com/Seerden/track/pull/112. Handle it soon after.
				color={sliderValue >= (habit.goal ?? 1) ? "green" : "blue"} // TODO: expand this into a gradient?
				style={{
					maxWidth: "200px",
					width: "100%"
				}}
				onChange={(value) => {
					setSliderValue(value);
				}}
				onChangeEnd={(value) => {
					setSliderValue(value);
					handleChangeEnd(value);
				}}
				value={sliderValue}
			/>
		</label>
	);
}
