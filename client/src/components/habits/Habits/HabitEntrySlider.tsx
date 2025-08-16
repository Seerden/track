import { habitEntryIsDone } from "@/components/habits/Habits/entry-is-completed";
import { ContextMenu } from "@/lib/hooks/useContextMenu";
import { colors } from "@/lib/theme/colors";
import Icons from "@/lib/theme/components/icons";
import type { HabitEntryUpdateMutationFunction } from "@/types/data.types";
import { NumberInput, Slider, Tooltip } from "@mantine/core";
import type {
	HabitEntry,
	HabitWithEntries,
	SyntheticHabitEntry
} from "@shared/lib/schemas/habit";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import { useState } from "react";
import { completionTooltipStyles } from "./HabitEntryToggle";
import S from "./style/HabitEntrySlider.style";

export default function HabitEntrySlider({
	habit,
	entry,
	onChangeEnd,
	width,
	showLabelText = true
}: {
	habit: HabitWithEntries;
	entry: HabitEntry | SyntheticHabitEntry;
	onChangeEnd: HabitEntryUpdateMutationFunction;
	width?: string;
	showLabelText?: boolean;
}) {
	const defaultValue = isSynthetic(entry) ? 0 : +entry.value;
	const [sliderValue, setSliderValue] = useState(() => defaultValue); // TODO: do we need to do anything else to fully synchronize this with the entry's value?
	const isDone = habitEntryIsDone({ habit, entry });

	function handleChangeEnd(value: number) {
		onChangeEnd({ input: entry, value: value.toString() });
	}

	if (habit.goal_type !== "goal") return;

	const label = (
		<label>
			{showLabelText && (
				<span>
					{sliderValue} {habit.goal_unit}
				</span>
			)}
			<S.SliderWrapper
				sliderColor={isDone ? colors.green.main : colors.blue.main}
				style={{
					width: width ?? "100%"
				}}
			>
				<Slider
					labelAlwaysOn={false}
					size={"sm"}
					thumbSize={15}
					disabled={sliderValue > habit.goal}
					defaultValue={defaultValue}
					min={0} // TODO: is this always the correct minimum value?
					max={Math.max(sliderValue, habit.goal) ?? 1} // TODO: habit.goal should always exist if goal_type is "goal"
					step={1}
					showLabelOnHover
					styles={{
						label: completionTooltipStyles
					}}
					label={(value) => `${habit.goal_unit}: ${value}/${habit.goal}`}
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
			</S.SliderWrapper>
		</label>
	);

	return (
		<ContextMenu label={"Habit slider (hover/focus)"} triggerKeys={["c"]}>
			{sliderValue > habit.goal ? (
				<Tooltip
					style={{
						position: "absolute",
						top: 0,
						padding: "0.4rem 0.5rem",
						borderRadius: "3px",
						left: 0,
						fontSize: "0.8rem",
						maxWidth: "300px",
						backgroundColor: "royalblue",
						color: "white",
						display: "inline-flex",
						flexwrap: "wrap"
					}}
					unstyled
					label={
						<div style={{ display: "flex", flexWrap: "wrap", maxWidth: "100%" }}>
							<div style={{ width: "max-content", maxWidth: "100%" }}>
								You exceeded the goal of {habit.goal} {habit.goal_unit} for this
								habit. Use the detailed view <Icons.Shortcut>c</Icons.Shortcut> to
								adjust the value.
							</div>
						</div>
					}
				>
					{label}
				</Tooltip>
			) : (
				label
			)}

			<>
				<NumberInput
					autoFocus
					min={0}
					suffix={habit.goal_unit ? ` ${habit.goal_unit}` : undefined}
					label={habit.name}
					defaultValue={defaultValue}
					value={sliderValue}
					onBlur={(e) => {
						const value = +e.target.value
							.replace(habit.goal_unit ? ` ${habit.goal_unit}` : "", "")
							.trim();
						if (isNaN(value)) return;
						setSliderValue(value);
						handleChangeEnd(value);
					}}
				/>
				<Slider
					disabled
					styles={{
						bar: {
							backgroundColor:
								sliderValue >= habit.goal ? colors.green.main : colors.blue.main
						}
					}}
					value={sliderValue}
					min={0}
					max={habit.goal}
				/>
			</>
		</ContextMenu>
	);
}
