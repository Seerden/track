import { habitEntryIsDone } from "@/components/habits/Habits/entry-is-completed";
import type { HabitEntryUpdateMutationFunction } from "@/lib/hooks/query/habits/useMutateHabitEntry";
import { colors } from "@/lib/theme/colors";
import type { SliderProps } from "@mantine/core";
import { Slider } from "@mantine/core";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@shared/types/data/habit.types";
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
	width?: string;
	alwaysShowLabelText?: boolean;
};

export default function HabitEntrySlider({
	habit,
	entry,
	onChangeEnd,
	width,
	alwaysShowLabelText = true
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
			{alwaysShowLabelText && (
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
