import type { MonthAndYear } from "@/components/utility/Calendar/calendar.types";
import type { DateValue } from "@mantine/dates";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

type UseMonthPickerProps = {
	initialDate: Dayjs;
	onChange?: React.Dispatch<React.SetStateAction<MonthAndYear>>;
};

/** Functionality hook for Calendar.tsx */
export default function useMonthPicker({ initialDate, onChange }: UseMonthPickerProps) {
	const [showMonthPicker, setShowMonthPicker] = useState(false);
	const initialValue = new Date(initialDate.year(), initialDate.month(), 1); // note: MonthPicker expects Date, so don't use our dayjs helpers
	const [monthValue, setMonthValue] = useState(initialValue);

	function handleMonthChange(value: DateValue) {
		if (!value) return;

		setMonthValue(value);
		setShowMonthPicker(false);
	}

	useEffect(() => {
		if (!monthValue) return;

		onChange?.({
			month: monthValue.getMonth(),
			year: monthValue.getFullYear()
		});
	}, [monthValue]);

	function handleArrowClick(direction: "previous" | "next") {
		setMonthValue((current) => {
			const modifier = direction === "previous" ? -1 : 1;
			const newDate = new Date(current);
			newDate.setMonth(newDate.getMonth() + modifier);
			return newDate;
		});
	}

	return {
		showMonthPicker,
		setShowMonthPicker,
		monthValue,
		setMonthValue,
		handleMonthChange,
		handleArrowClick
	};
}
