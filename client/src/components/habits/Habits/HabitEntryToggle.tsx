import { Tooltip } from "@mantine/core";
import type {
	HabitWithPossiblySyntheticEntries,
	PossiblySyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import { useState } from "react";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { formatToYearMonthDay } from "@/lib/datetime/format-date";
import { createDate } from "@/lib/datetime/make-date";
import { completionTooltipStyles } from "./style/Completion.style";

export type HabitEntryChangeHandler = (input: {
	input: PossiblySyntheticHabitEntry;
	value?: string;
}) => void;

export default function HabitEntryToggle({
	habit,
	entry,
	onChange,
}: {
	habit: HabitWithPossiblySyntheticEntries;
	entry: PossiblySyntheticHabitEntry;
	onChange: HabitEntryChangeHandler;
}) {
	const defaultValue = Boolean(
		isSynthetic(entry) ? false : entry.value === "true"
	);
	const [value, setValue] = useState(defaultValue);

	if (habit.goal_type !== "checkbox") return;

	return (
		// TODO: styling
		<Tooltip
			withArrow
			styles={{
				tooltip: completionTooltipStyles.regular,
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
