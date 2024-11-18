import { buildCalendarRows } from "@/components/utility/Calendar/build-calendar-rows";
import type { MonthAndYear } from "@/components/utility/Calendar/calendar.types";
import { formatToMonthAndYear } from "@/lib/datetime/format-date";
import { createDate, createFirstOfTheMonth } from "@/lib/datetime/make-date";
import type { Maybe } from "@t/data/utility.types";
import type { Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseCalendarProps = {
	initialDate: Dayjs;
	onChange?: React.Dispatch<React.SetStateAction<Dayjs>>;
};

/** Functionality hook for Calendar.tsx */
export function useCalendar({ initialDate, onChange }: UseCalendarProps) {
	const [selectedDate, setSelectedDate] = useState<Maybe<Dayjs>>(initialDate);

	useEffect(() => {
		// This effect is necessary because it's possible to change the date in
		// other parts of the page, and we want to keep the selected date in sync.
		if (initialDate) setSelectedDate(initialDate);
	}, [initialDate]);

	useEffect(() => {
		if (selectedDate) onChange?.(selectedDate);
	}, [selectedDate]);

	const [monthAndYear, setMonthAndYear] = useState<MonthAndYear>(() => ({
		month: initialDate.month(),
		year: initialDate.year()
	}));

	const firstDayOfTheMonth = useMemo(
		() => createFirstOfTheMonth(monthAndYear),
		[monthAndYear]
	);

	const selectDate = useCallback(
		(day: number | null) => {
			if (day === null) return;

			setSelectedDate(
				createDate(new Date(monthAndYear.year, monthAndYear.month, day))
			);
		},
		[monthAndYear, setSelectedDate]
	);

	const rows = buildCalendarRows(firstDayOfTheMonth);

	const title = useMemo(
		() => formatToMonthAndYear(firstDayOfTheMonth),
		[firstDayOfTheMonth]
	);

	return {
		monthAndYear,
		setMonthAndYear,
		rows,
		title,
		selectDate,
		selectedDate
	} as const;
}
