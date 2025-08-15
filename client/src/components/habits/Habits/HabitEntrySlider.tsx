import { habitEntryIsDone } from "@/components/habits/Habits/entry-is-completed";
import { colors } from "@/lib/theme/colors";
import type { HabitEntryUpdateMutationFunction } from "@/types/data.types";
import type { SliderProps } from "@mantine/core";
import { Slider } from "@mantine/core";
import type {
	HabitEntry,
	HabitWithEntries,
	SyntheticHabitEntry
} from "@shared/lib/schemas/habit";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import { useState } from "react";

const sliderProps: SliderProps = {
	labelAlwaysOn: false,
	showLabelOnHover: false,
	size: "sm",
	thumbSize: 15
};

type HabitEntrySliderProps = {
	habit: HabitWithEntries;
	entry: HabitEntry | SyntheticHabitEntry;
	onChangeEnd: HabitEntryUpdateMutationFunction;
	width?: string;
	showLabelText?: boolean;
};

export default function HabitEntrySlider({
	habit,
	entry,
	onChangeEnd,
	width,
	showLabelText = true
}: HabitEntrySliderProps) {
	const defaultValue = isSynthetic(entry) ? 0 : +entry.value;
	const [sliderValue, setSliderValue] = useState(() => defaultValue); // TODO: do we need to do anything else to fully synchronize this with the entry's value?
	const isDone = habitEntryIsDone({ habit, entry });

	function handleChangeEnd(value: number) {
		onChangeEnd({ input: entry, value: value.toString() });
	}

	if (habit.goal_type !== "goal") return;

	return (
		<label>
			{showLabelText && (
				<span>
					{sliderValue} {habit.goal_unit}
				</span>
			)}
			<div
				style={{
					width: width ?? "100%"
				}}
			>
				<Slider
					{...sliderProps}
					defaultValue={defaultValue}
					min={0} // TODO: is this always the correct minimum value?
					max={habit.goal ?? 1} // TODO: habit.goal should always exist if goal_type is "goal"
					step={1}
					label={(value) => `${value} ${habit.goal_unit}`}
					// TODO: color and styling are work in progress that is out of scope
					// for https://github.com/Seerden/track/pull/112. Handle it soon after.
					color={isDone ? colors.green.main : colors.blue.main} // TODO: expand this into a gradient?
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
			</div>
		</label>
	);
}
