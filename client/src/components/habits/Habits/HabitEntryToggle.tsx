import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { formatToYearMonthDay } from "@/lib/datetime/format-date";
import { createDate } from "@/lib/datetime/make-date";
import type { HabitEntryUpdateMutationFunction } from "@/types/data.types";
import { Tooltip } from "@mantine/core";
import type {
	HabitEntry,
	HabitWithEntries,
	SyntheticHabitEntry
} from "@shared/lib/schemas/habit";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import { useState, type CSSProperties } from "react";

export const completionTooltipStyles: CSSProperties = {
	borderRadius: 0,
	backgroundColor: "#f7f7f7",
	color: "black",
	borderEndEndRadius: "3px",
	fontSize: "0.88rem",
	padding: "0.3rem 0.6rem",
	outline: "1px solid #aaa",
	boxShadow: `
      0 0.4rem 0 -0.2rem #ddd,
      0 0.2rem 0.3rem 0 #aaa`
};

export default function HabitEntryToggle({
	habit,
	entry,
	onChange
}: {
	habit: HabitWithEntries;
	entry: HabitEntry | SyntheticHabitEntry;
	onChange: HabitEntryUpdateMutationFunction;
}) {
	const defaultValue = Boolean(
		isSynthetic(entry) ? false : (entry as HabitEntry).value === "true"
	);
	const [value, setValue] = useState(defaultValue);

	if (habit.goal_type !== "checkbox") return;

	return (
		// TODO: styling
		<Tooltip
			withArrow
			styles={{
				tooltip: completionTooltipStyles
			}}
			label={
				<>
					{formatToYearMonthDay(createDate(entry.date))} (#{entry.index + 1})
				</>
			}
		>
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
		</Tooltip>
	);
}
