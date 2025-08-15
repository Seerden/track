import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import type { HabitEntryUpdateMutationFunction } from "@/types/data.types";
import type {
	HabitEntry,
	HabitWithEntries,
	SyntheticHabitEntry
} from "@shared/lib/schemas/habit";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import { useState } from "react";

type HabitEntryToggleProps = {
	habit: HabitWithEntries;
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
