import type { HabitWithIds } from "@/types/server/habit.types";
import { Slider } from "@mantine/core";

type HabitEntrySliderProps = {
	habit: HabitWithIds;
	value: number;
	setValue: (value: number) => void;
	showValue: boolean;
	setShowValue: (show: boolean) => void;
};

export default function HabitEntrySlider({
	habit,
	value,
	setValue,
	showValue,
	setShowValue
}: HabitEntrySliderProps) {
	const sliderCount = 1; // TODO: this should be dynamic, based on the frequency, which in turn is dependent on the interval and currently displayed timescale

	if (habit.goal_type !== "goal") {
		// TODO: properly handle this, maybe by splitting up the habit type to be
		// a union of checkbox and goal-type habits
		return;
	}

	return (
		<label
			style={{
				width: `calc(100% / ${sliderCount})`
			}}
		>
			<span
				style={{
					visibility: showValue ? "visible" : "hidden"
				}}
			>
				{value} {habit.goal_unit}
			</span>
			<Slider
				defaultValue={0} // TODO: use the value from the entry
				labelAlwaysOn={false}
				showLabelOnHover={false}
				min={0} // TODO: is this always the correct minimum value?
				size={"sm"}
				thumbSize={15}
				max={habit.goal ?? 1} // TODO: habit.goal should always exist if goal_type is "goal"
				step={1}
				label={(value) => `${value} ${habit.goal_unit}`}
				color={value >= (habit.goal ?? 1) ? "green" : "blue"} // TODO: expand this into a gradient?
				style={{
					maxWidth: "200px",
					width: "100%" // TODO: this width should be dynamic, based on the frequency, which in turn is dependent on the interval and currently displayed timescale
				}}
				onChange={(value) => {
					setShowValue(false);
					setValue(value);
				}}
				onChangeEnd={() => setShowValue(true)}
				value={value}
			/>
		</label>
	);
}
