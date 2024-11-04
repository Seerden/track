import type { Row } from "@/components/Calendar/build-calendar-rows";
import { buildCalendarRows } from "@/components/Calendar/build-calendar-rows";
import type { CalendarProps, MonthAndYear } from "@/components/Calendar/calendar.types";
import useMonthPicker from "@/components/Calendar/use-month-picker";
import { toMonthAndYear } from "@/lib/datetime/format-date";
import { createDate, firstOfTheMonth } from "@/lib/datetime/make-date";
import { daysOfWeekShort } from "@/lib/datetime/weekdays";
import type { Maybe } from "@/types/server/utility.types";
import { MonthPicker } from "@mantine/dates";
import type { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import S from "./Calendar.style";

type UseCalendarProps = CalendarProps & {
	setExternalState?: React.Dispatch<React.SetStateAction<Maybe<Dayjs>>>;
};

function useCalendar({ initialMonth, initialYear, setExternalState }: UseCalendarProps) {
	const [selectedDate, setSelectedDate] = useState<Maybe<Dayjs>>();

	const [monthAndYear, setMonthAndYear] = useState<MonthAndYear>(() => ({
		month: initialMonth,
		year: initialYear
	}));

	const firstDayOfTheMonth = useMemo(
		() => firstOfTheMonth(monthAndYear), // TODO: use firstDayOfMonth function here
		[monthAndYear]
	);

	const selectDate = useCallback(
		(day: number) => {
			setSelectedDate(
				createDate(new Date(monthAndYear.year, monthAndYear.month, day))
			);
		},
		[monthAndYear, setSelectedDate]
	);

	useEffect(() => {
		if (selectedDate) setExternalState?.(selectedDate);
	}, [selectedDate]);

	const rows = buildCalendarRows(firstDayOfTheMonth);

	const title = useMemo(() => toMonthAndYear(firstDayOfTheMonth), [firstDayOfTheMonth]);

	return {
		monthAndYear,
		setMonthAndYear,
		rows,
		title,
		selectDate,
		selectedDate
	} as const;
}

type CalendarRowProps = {
	month: number;
	year: number;
	row: Row;
	selectDate: (day: number) => void;
	selectedDate?: Maybe<Dayjs>;
};

function CalendarRow({ month, year, row, selectDate, selectedDate }: CalendarRowProps) {
	function isSelected(day: number | null) {
		if (!selectedDate || !day) return false;
		return (
			day === selectedDate.date() &&
			month === selectedDate.month() &&
			year === selectedDate.year()
		);
	}

	return (
		<S.Row>
			{row.map((day, index) => (
				<S.Cell
					disabled={day === null}
					key={index}
					onClick={() => (day ? selectDate(day) : undefined)}
					$selected={isSelected(day)}
				>
					{day}
				</S.Cell>
			))}
		</S.Row>
	);
}

export default function Calendar({
	initialMonth,
	initialYear,
	setState: setExternalState
}: CalendarProps) {
	const { monthAndYear, setMonthAndYear, title, rows, selectDate, selectedDate } =
		useCalendar({
			initialMonth,
			initialYear,
			setExternalState
		});

	const { handleMonthChange, showMonthPicker, setShowMonthPicker, monthValue } =
		useMonthPicker({ initialMonth, initialYear, setExternalState: setMonthAndYear });

	return (
		<S.Calendar>
			{showMonthPicker ? (
				<S.MonthPickerWrapper>
					<MonthPicker
						flex="1"
						value={monthValue}
						onChange={handleMonthChange}
						size={"xs"}
					/>
				</S.MonthPickerWrapper>
			) : (
				<>
					<S.TitleWrapper>
						<S.Title onClick={() => setShowMonthPicker(true)}>{title}</S.Title>
					</S.TitleWrapper>
					<S.Days>
						{daysOfWeekShort.map((day) => (
							<S.Day key={day}>{day}</S.Day>
						))}
					</S.Days>
					<S.Rows>
						{rows.map((row, i) => (
							<CalendarRow
								month={monthAndYear.month}
								year={monthAndYear.year}
								key={i}
								row={row}
								selectDate={selectDate}
								selectedDate={selectedDate}
							/>
						))}
					</S.Rows>
				</>
			)}
		</S.Calendar>
	);
}
