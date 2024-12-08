import type { HabitEntryUpdateMutationFunction } from "@/lib/hooks/query/habits/useMutateHabitEntry";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import { isSynthetic } from "@t/data/habit-entry.guards";
import type { HabitEntry, HabitWithIds, SyntheticHabitEntry } from "@t/data/habit.types";
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
	const defaultValue = Boolean(
		isSynthetic(entry) ? false : (entry as HabitEntry).value === "true"
	);
	const [value, setValue] = useState(defaultValue);

	if (habit.goal_type !== "checkbox") return;

	return (
		// TODO: styling
		<label style={{ width: "max-content" }}>
			<Checkbox
				tabIndex={0}
				size={20}
				checked={value}
				onChange={(e) => {
					onChange({ input: entry, value: (!value).toString() });
					setValue(e.target.checked);
				}}
			/>
		</label>
	);
}
