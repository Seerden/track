import { buildCalendarRows } from "@/components/utility/Calendar/build-calendar-rows";
import type { MonthAndYear } from "@/components/utility/Calendar/calendar.types";
import { prebuiltCalendarRows } from "@/components/utility/Calendar/constants";
import { createMonthAndYear } from "@/components/utility/Calendar/hooks/create-date";
import { formatToMonthAndYear } from "@/lib/datetime/format-date";
import { createDate, createFirstOfTheMonth } from "@/lib/datetime/make-date";
import type { Maybe } from "@shared/types/data/utility.types";
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
		if (initialDate) {
			// TODO: only update selectedDate if the day of year changes.I guess
			// this isn't strictly necessary since our day-change methods all set a
			// _day_, not necessarily a time, but maybe the useCurrentTime hook
			// messes with that, and we _should_ do the above for perfomrance
			// reasons.
			setSelectedDate(initialDate);
			// Whenever the outside date changes, update state to reflect that. This
			// pattern looks a bit messy, but that's what you get with 2-way binding.
			setMonthAndYear(createMonthAndYear(initialDate));
		}
	}, [initialDate]);

	// TODO: this can go inside the selectDate handler.
	useEffect(() => {
		if (selectedDate) onChange?.(selectedDate);
	}, [selectedDate]);

	const [monthAndYear, setMonthAndYear] = useState<MonthAndYear>(() =>
		createMonthAndYear(initialDate)
	);

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

	const existingRows = prebuiltCalendarRows.find(
		({ month, year }) =>
			month === firstDayOfTheMonth.month() && year === firstDayOfTheMonth.year()
	);
	const rows = existingRows?.rows || buildCalendarRows(firstDayOfTheMonth);

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
