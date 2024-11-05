import type { MonthAndYear } from "@/components/Calendar/calendar.types";
import type { DateValue } from "@mantine/dates";
import { useState } from "react";

type UseMonthPickerProps = {
	initialMonth: number;
	initialYear: number;
	onChange?: React.Dispatch<React.SetStateAction<MonthAndYear>>;
};

/** Functionality hook for Calendar.tsx */
export default function useMonthPicker({
	initialMonth,
	initialYear,
	onChange
}: UseMonthPickerProps) {
	const [showMonthPicker, setShowMonthPicker] = useState(false);
	const initialValue = new Date(initialYear, initialMonth, 1); // note: MonthPicker expects Date, so don't use our dayjs helpers
	const [monthValue, setMonthValue] = useState(initialValue);

	function handleMonthChange(value: DateValue) {
		if (!value) return;

		setMonthValue(value);
		onChange?.({
			month: value.getMonth(),
			year: value.getFullYear()
		});
		setShowMonthPicker(false);
	}

	return {
		showMonthPicker,
		setShowMonthPicker,
		monthValue,
		setMonthValue,
		handleMonthChange
	};
}