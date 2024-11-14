import type { EntryMutationFunction } from "@/lib/query/habits/useHabitEntryMutation";
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
	onChange: EntryMutationFunction;
};

export default function HabitEntryToggle({
	habit,
	entry,
	onChange
}: HabitEntryToggleProps) {
	const defaultValue = Boolean(isSynthetic(entry) ? false : entry.value);
	const [value, setValue] = useState(defaultValue);

	if (habit.goal_type !== "checkbox") return;

	return (
		<label>
			<input
				type="checkbox"
				checked={value}
				onChange={(e) => {
					setValue(e.target.checked);
					onChange({ input: entry, value: e.target.checked.toString() });
				}}
			/>
		</label>
	);
}
