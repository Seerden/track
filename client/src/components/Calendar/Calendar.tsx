import { createDate } from "@/lib/datetime/make-date";
import type { Maybe } from "@/types/server/utility.types";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import S from "./Calendar.style";

type Cell = number | null;
type Row = Cell[];
type Rows = Row[];

type UseCalendarProps = CalendarProps & {
	setExternalState?: React.Dispatch<React.SetStateAction<Maybe<Dayjs>>>;
};

function useCalendar({ month, year, setExternalState }: UseCalendarProps) {
	const [selectedDate, setSelectedDate] = useState<Maybe<Dayjs>>();
	function selectDate(day: number | null) {
		if (!day) return;
		const date = createDate(new Date(year, month, day));
		setSelectedDate(date);
	}

	useEffect(() => {
		if (!selectedDate) return;

		setExternalState?.(selectedDate);
	}, [selectedDate]);

	const firstDayOfWeek: "monday" | "sunday" = "monday"; // TODO: make this configurable by user
	const date = dayjs(new Date(year, month, 1));
	const numberOfDaysInMonth = date.daysInMonth();

	/**
	 * every row in the calendar has 7 days, but the first row may have some
	 * empty cells, depending on what day of the week the month starts on.
	 * the easiest way to create the rows is to build a list of indexes (index
	 * represents dayOfMonth), prepend that by however many days of the week the
	 * first week is shifted by (e.g. if january 1st falls on thursday, and
	 * monday is specified as the start of a week, then we prepend three empty
	 * cells, and we could represent those by null, or whatever) */

	// TODO: put the offset in a variable and allow for any day to be the first
	// day of the week
	const firstOfMonthDay =
		(date.startOf("month").day() + (firstDayOfWeek === "monday" ? 6 : 0)) % 7;
	const lastOfMonthDay =
		(date.endOf("month").day() + (firstDayOfWeek === "monday" ? 6 : 0)) % 7;
	const dayCellsWithValue: Row = Array.from(
		{ length: numberOfDaysInMonth },
		(_, i) => i + 1
	);
	const emptyCellsStart: Row = Array.from({ length: firstOfMonthDay }, () => null);
	const emptyCellsEnd: Row = Array.from({ length: 6 - lastOfMonthDay }, () => null);
	const cells: Row = [...emptyCellsStart, ...dayCellsWithValue, ...emptyCellsEnd]; // TODO: use concat instead of spreading

	const rows: Rows = [];
	let i = 0;
	while (i < cells.length) {
		const slice: Row = cells.slice(i, i + 7);
		rows.push(slice);
		i += 7;
	}

	// TODO: use dayjs to determine these strings (which allows for localization
	// and customization), and optionally shift the days to allow for any day to
	// be the first day of the week -- see https://day.js.org/docs/en/plugin/locale-data
	const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const title = dayjs(new Date(year, month, 1)).format("MMMM YYYY");

	return {
		rows,
		daysOfWeek,
		title,
		selectDate,
		selectedDate
	} as const;
}

type CalendarRowProps = {
	row: Row;
	selectDate: (day: number | null) => void;
	selectedDate?: Maybe<Dayjs>;
};

function CalendarRow({ row, selectDate, selectedDate }: CalendarRowProps) {
	function isSelected(day: number | null) {
		if (!selectedDate || !day) return false;
		return day === selectedDate.date();
	}

	return (
		<S.Row>
			{row.map((day, index) => (
				<S.Cell
					disabled={day === null}
					key={index}
					onClick={() => selectDate(day)}
					$selected={isSelected(day)}
				>
					{day}
				</S.Cell>
			))}
		</S.Row>
	);
}

export type CalendarProps = {
	/** Month to focus on initially. */
	month: number;
	/** Year to focus on initially. */
	year: number;
};

export default function Calendar({ month, year }: CalendarProps) {
	const { title, daysOfWeek, rows, selectDate, selectedDate } = useCalendar({
		month,
		year
	});

	return (
		<S.Calendar>
			<S.Title>{title}</S.Title>
			<S.Days>
				{daysOfWeek.map((day) => (
					<S.Day key={day}>{day}</S.Day>
				))}
			</S.Days>
			<S.Rows>
				{rows.map((row, i) => (
					<CalendarRow
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
