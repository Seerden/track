import type { EntryMutationFunction } from "@/lib/query/habits/useHabitEntryMutation";
import { isSynthetic } from "@/types/server/habit-entry.guards";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@/types/server/habit.types";
import type { SliderProps } from "@mantine/core";
import { Slider } from "@mantine/core";
import { useCallback, useState } from "react";

const sliderProps: SliderProps = {
	labelAlwaysOn: false,
	showLabelOnHover: false,
	size: "sm",
	thumbSize: 15
};

type HabitEntrySliderProps = {
	habit: HabitWithIds;
	entry: HabitEntry | SyntheticHabitEntry;
	onChangeEnd: EntryMutationFunction;
};

export default function HabitEntrySlider({
	habit,
	entry,
	onChangeEnd
}: HabitEntrySliderProps) {
	const defaultValue = isSynthetic(entry) ? 0 : +entry.value;
	const [value, setValue] = useState(() => defaultValue); // TODO: do we need to do anything else to fully synchronize this with the entry's value?

	const handleChangeEnd = useCallback(
		(sliderValue: number) => {
			onChangeEnd({ input: entry, value: sliderValue.toString() });
		},
		[value] // does not need to ba a callback
	);
	if (habit.goal_type !== "goal") return;

	return (
		<label>
			<span>
				{value} {habit.goal_unit}
			</span>
			<Slider
				{...sliderProps}
				defaultValue={defaultValue}
				min={0} // TODO: is this always the correct minimum value?
				max={habit.goal ?? 1} // TODO: habit.goal should always exist if goal_type is "goal"
				step={1}
				label={(value) => `${value} ${habit.goal_unit}`}
				color={value >= (habit.goal ?? 1) ? "green" : "blue"} // TODO: expand this into a gradient?
				style={{
					maxWidth: "200px",
					width: "100%"
				}}
				onChange={(sliderValue) => {
					setValue(sliderValue);
				}}
				onChangeEnd={(sliderValue) => {
					setValue(sliderValue);
					handleChangeEnd(sliderValue);
				}}
				value={value}
			/>
		</label>
	);
}
