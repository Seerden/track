import { buildCalendarRows } from "@/components/Calendar/build-calendar-rows";
import type { CalendarProps, MonthAndYear } from "@/components/Calendar/calendar.types";
import { toMonthAndYear } from "@/lib/datetime/format-date";
import { createDate, firstOfTheMonth } from "@/lib/datetime/make-date";
import type { Maybe } from "@/types/server/utility.types";
import type { Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseCalendarProps = CalendarProps & {
	setExternalState?: React.Dispatch<React.SetStateAction<Maybe<Dayjs>>>;
};

/** Functionality hook for Calendar.tsx */
export function useCalendar({
	initialMonth,
	initialYear,
	setExternalState,
}: UseCalendarProps) {
	const [selectedDate, setSelectedDate] = useState<Maybe<Dayjs>>();

	useEffect(() => {
		if (selectedDate) setExternalState?.(selectedDate);
	}, [selectedDate]);

	const [monthAndYear, setMonthAndYear] = useState<MonthAndYear>(() => ({
		month: initialMonth,
		year: initialYear,
	}));

	const firstDayOfTheMonth = useMemo(
		() => firstOfTheMonth(monthAndYear), // TODO: use firstDayOfMonth function here
		[monthAndYear],
	);

	const selectDate = useCallback(
		(day: number) => {
			setSelectedDate(
				createDate(new Date(monthAndYear.year, monthAndYear.month, day)),
			);
		},
		[monthAndYear, setSelectedDate],
	);

	const rows = buildCalendarRows(firstDayOfTheMonth);

	const title = useMemo(() => toMonthAndYear(firstDayOfTheMonth), [firstDayOfTheMonth]);

	return {
		monthAndYear,
		setMonthAndYear,
		rows,
		title,
		selectDate,
		selectedDate,
	} as const;
}
