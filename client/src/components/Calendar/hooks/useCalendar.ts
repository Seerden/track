import { buildCalendarRows } from "@/components/Calendar/build-calendar-rows";
import type { MonthAndYear } from "@/components/Calendar/calendar.types";
import { formatToMonthAndYear } from "@/lib/datetime/format-date";
import { createDate, createFirstOfTheMonth } from "@/lib/datetime/make-date";
import type { Maybe } from "@/types/server/utility.types";
import type { Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseCalendarProps = {
	initialDay: number;
	initialMonth: number;
	initialYear: number;
	onChange?: React.Dispatch<React.SetStateAction<Dayjs>>;
};

/** Functionality hook for Calendar.tsx */
export function useCalendar({
	initialDay,
	initialMonth,
	initialYear,
	onChange
}: UseCalendarProps) {
	const [selectedDate, setSelectedDate] = useState<Maybe<Dayjs>>(
		createDate(new Date(initialYear, initialMonth, initialDay))
	);

	useEffect(() => {
		if (selectedDate) onChange?.(selectedDate);
	}, [selectedDate]);

	const [monthAndYear, setMonthAndYear] = useState<MonthAndYear>(() => ({
		month: initialMonth,
		year: initialYear
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
