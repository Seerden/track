import L from "@/lib/theme/components/List.style";
import type { HabitEntry, HabitWithIds } from "@/types/server/habit.types";
import type { ById } from "@/types/server/utility.types";
import { Slider } from "@mantine/core";
import { useState } from "react";

// TODO: put this in @types/
type HabitWithEntries = HabitWithIds & {
	entries: ById<HabitEntry>;
};

function frequencyString({
	frequency,
	interval,
	interval_unit,
	goal,
	goal_unit,
	goal_type
}: HabitWithIds) {
	let prefix = "";
	const frequencySuffix = frequency > 1 ? "s" : "";
	const intervalSuffix = interval > 1 ? "s" : "";
	const frequencyLine =
		frequency === 1 ? (interval > 1 ? "once" : "") : `${frequency} times`;
	const intervalLine = interval === 1 ? "every" : `per ${interval}`;
	const humanized = `${frequencyLine} ${intervalLine} ${interval_unit}${intervalSuffix} `;
	if (goal_type === "goal") {
		prefix = `${goal} ${goal_unit}, `;
	}
	return prefix + humanized;
}

/**
 * I'm calling this `HabitEntryItem` but that's a misnomer. The component
 * represents a habit with its entries for a given date (range), so it can
 * actually have multiple entries. Only in a daily view for a habit with a
 * once-a-day frequency (or similar for week, month, etc.) will it only have a
 * single entry.
 *
 * I want to style this similarly to Tasks list items from Today, so part of
 * implementing this component will be to generalize the styles from that component.
 */

export default function HabitEntryItem({ habit }: { habit: HabitWithEntries }) {
	const [value, setValue] = useState(0); // actually gets the value of the entry at the given index
	const [showValue, setShowValue] = useState(true);

	return (
		<L.Item
			style={{
				display: "grid",
				gridTemplateColumns: "max-content max-content 1fr",
				maxWidth: "500px"
			}}
		>
			<L.ItemName>{habit.name}</L.ItemName>
			<L.Info>{frequencyString(habit)}</L.Info>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifySelf: "flex-end",
					alignItems: "center",
					gap: "1rem"
				}}
			>
				<input type="checkbox" />
				<label>
					<span
						style={{
							visibility: showValue ? "visible" : "hidden"
						}}
					>
						{value} {habit.goal_unit}
					</span>
					<Slider
						defaultValue={0}
						labelAlwaysOn={false}
						showLabelOnHover={false}
						min={0}
						size={"sm"}
						thumbSize={15}
						max={habit.goal ?? 1}
						step={1}
						label={(value) => `${value} ${habit.goal_unit}`}
						color={value >= (habit.goal ?? 1) ? "green" : "blue"}
						style={{ width: "100px" }}
						onChange={(value) => {
							setShowValue(false);
							setValue(value);
						}}
						onChangeEnd={() => setShowValue(true)}
						value={value}
					/>
				</label>
			</div>
		</L.Item>
	);
}
