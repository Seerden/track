import { buildCalendarRows, Row } from "@/components/Calendar/build-calendar-rows";
import { createDate } from "@/lib/datetime/make-date";
import type { Maybe } from "@/types/server/utility.types";
import { DateValue, MonthPicker } from "@mantine/dates";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import S from "./Calendar.style";

type MonthAndYear = {
	month: number;
	year: number;
};

type UseCalendarProps = CalendarProps & {
	setExternalState?: React.Dispatch<React.SetStateAction<Maybe<Dayjs>>>;
};

function useCalendar({ initialMonth, initialYear, setExternalState }: UseCalendarProps) {
	const [selectedDate, setSelectedDate] = useState<Maybe<Dayjs>>();

	const [monthAndYear, setMonthAndYear] = useState<MonthAndYear>(() => ({
		month: initialMonth,
		year: initialYear,
	}));

	const firstDayOfTheMonth = useMemo(
		() => dayjs(new Date(monthAndYear.year, monthAndYear.month, 1)), // TODO: use firstDayOfMonth function here
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

	useEffect(() => {
		if (selectedDate) setExternalState?.(selectedDate);
	}, [selectedDate]);

	const rows = buildCalendarRows(firstDayOfTheMonth);

	// TODO: use dayjs to determine these strings (which allows for localization
	// and customization), and optionally shift the days to allow for any day to
	// be the first day of the week -- see https://day.js.org/docs/en/plugin/locale-data
	const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const title = useMemo(
		() => firstDayOfTheMonth.format("MMMM YYYY"), // TODO: this should be in format-date.ts
		[firstDayOfTheMonth],
	);

	return {
		monthAndYear,
		setMonthAndYear,
		rows,
		daysOfWeek,
		title,
		selectDate,
		selectedDate,
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

type CalendarProps = {
	/** Month to focus on initially. */
	initialMonth: number;
	/** Year to focus on initially. */
	initialYear: number;
	/** Function to set the selected date. */
	setState?: React.Dispatch<React.SetStateAction<Maybe<Dayjs>>>;
};

function useMonthPicker({
	initialMonth,
	initialYear,
	setExternalState,
}: CalendarProps & {
	setExternalState?: React.Dispatch<React.SetStateAction<MonthAndYear>>;
}) {
	const [showMonthPicker, setShowMonthPicker] = useState(false);
	const initialValue = new Date(initialYear, initialMonth, 1); // TODO: use firstDayOfMonth function here
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

export default function Calendar({
	initialMonth,
	initialYear,
	setState: setExternalState,
}: CalendarProps) {
	const {
		monthAndYear,
		setMonthAndYear,
		title,
		daysOfWeek,
		rows,
		selectDate,
		selectedDate,
	} = useCalendar({
		initialMonth,
		initialYear,
		setExternalState,
	});

	const { handleMonthChange, showMonthPicker, setShowMonthPicker, monthValue } =
		useMonthPicker({ initialMonth, initialYear, setExternalState: setMonthAndYear });

	return (
		<S.Calendar>
			<S.TitleWrapper>
				<S.Title onClick={() => setShowMonthPicker(true)}>{title}</S.Title>
				{showMonthPicker && (
					<S.MonthPickerWrapper>
						<MonthPicker
							value={monthValue}
							onChange={handleMonthChange}
							size={"xs"}
						/>
					</S.MonthPickerWrapper>
				)}
			</S.TitleWrapper>
			<S.Days>
				{daysOfWeek.map((day) => (
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
		</S.Calendar>
	);
}
