import type { MonthAndYear } from "@/components/utility/Calendar/calendar.types";
import type { DateValue } from "@mantine/dates";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

// TODO: put this in a helper file
function createMonthValue(date: Dayjs) {
	return new Date(date.year(), date.month(), 1); // note: MonthPicker expects Date, so don't use our dayjs helpers
}

type UseMonthPickerProps = {
	initialDate: Dayjs;
	onChange?: React.Dispatch<React.SetStateAction<MonthAndYear>>;
};

/** Functionality hook for Calendar.tsx */
export default function useMonthPicker({ initialDate, onChange }: UseMonthPickerProps) {
	const [showMonthPicker, setShowMonthPicker] = useState(false);

	const defaultMonthValue = createMonthValue(initialDate);
	const [monthValue, setMonthValue] = useState(defaultMonthValue);

	useEffect(() => {
		// Whenever the outside date changes, update state to reflect that. This
		// pattern looks a bit messy, but that's what you get with 2-way binding.
		setMonthValue(createMonthValue(initialDate));
	}, [initialDate]);

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
