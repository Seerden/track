import type { CalendarProps, MonthAndYear } from "@/components/Calendar/calendar.types";
import type { DateValue } from "@mantine/dates";
import { useState } from "react";

/** Functionality hook for Calendar.tsx */
export default function useMonthPicker({
	initialMonth,
	initialYear,
	setExternalState,
}: CalendarProps & {
	setExternalState?: React.Dispatch<React.SetStateAction<MonthAndYear>>;
}) {
	const [showMonthPicker, setShowMonthPicker] = useState(false);
	const initialValue = new Date(initialYear, initialMonth, 1); // note: MonthPicker expects Date, so don't use our dayjs helpers
	const [monthValue, setMonthValue] = useState(initialValue);

	function handleMonthChange(value: DateValue) {
		if (!value) return;

		setMonthValue(value);
		setExternalState?.({
			month: value.getMonth(),
			year: value.getFullYear(),
		});
		setShowMonthPicker(false);
	}

	return {
		showMonthPicker,
		setShowMonthPicker,
		monthValue,
		setMonthValue,
		handleMonthChange,
	};
}
