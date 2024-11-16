import type { HabitEntryUpdateMutationFunction } from "@/lib/query/habits/useHabitEntryMutation";
import { isSynthetic } from "@/types/server/habit-entry.guards";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@/types/server/habit.types";
import { useState } from "react";

type HabitEntryToggleProps = {
	habit: HabitWithIds;
	entry: HabitEntry | SyntheticHabitEntry;
	onChange: HabitEntryUpdateMutationFunction;
};

export default function HabitEntryToggle({
	habit,
	entry,
	onChange
}: HabitEntryToggleProps) {
	const defaultValue = Boolean(isSynthetic(entry) ? false : entry.value === "true");
	const [value, setValue] = useState(defaultValue);

	if (habit.goal_type !== "checkbox") return;

	return (
		// TODO: styling
		<label style={{ width: "max-content" }}>
			<input
				type="checkbox"
				checked={value}
				onChange={(e) => {
					onChange({ input: entry, value: (!value).toString() });
					setValue(e.target.checked);
				}}
			/>
		</label>
	);
}
