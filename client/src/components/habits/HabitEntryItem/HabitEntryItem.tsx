import HabitEntrySlider from "@/components/habits/HabitEntryItem/HabitEntrySlider";
import HabitEntryToggle from "@/components/habits/HabitEntryItem/HabitEntryToggle";
import L from "@/lib/theme/components/List.style";
import type { HabitEntry, HabitWithIds } from "@/types/server/habit.types";
import type { ById } from "@/types/server/utility.types";
import { useState } from "react";

// TODO: put this in @types/
export type HabitWithEntries = HabitWithIds & {
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
	const intervalSuffix = interval > 1 ? "s" : "";
	const frequencyLine =
		frequency === 1 ? (interval > 1 ? "once" : "") : `${frequency} times`;
	const intervalLine = interval === 1 ? "every" : `per ${interval}`;
	const humanized = `${frequencyLine} ${intervalLine} ${interval_unit}${intervalSuffix}`;
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
	const [value, setValue] = useState(0); // actually needs to be the value of the entry at the given index
	const [showValue, setShowValue] = useState(true);

	return (
		<L.Item
			onClick={() => {}} // TODO: open detailed habit modal
			style={{
				display: "grid",
				gridTemplateColumns: "subgrid",
				gridColumn: "1 / -1",
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
					gap: "1rem",
					width: "100%"
				}}
			>
				{habit.goal_type === "checkbox" ? (
					<HabitEntryToggle
						value={Boolean(habit.entries[0]?.value) ?? false} // TODO
						setValue={() => {}} // TODO
					/>
				) : (
					<HabitEntrySlider
						habit={habit}
						value={value}
						setValue={setValue}
						showValue={showValue}
						setShowValue={setShowValue}
					/>
				)}
			</div>
		</L.Item>
	);
}
