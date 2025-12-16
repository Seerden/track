import { MonthPicker } from "@mantine/dates";
import day from "@shared/lib/day";
import type { Maybe } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
import type { ReactNode } from "react";
import { today } from "@/lib/datetime/make-date";
import { daysOfWeekShort } from "@/lib/datetime/weekdays";
import Buttons from "@/lib/theme/components/buttons";
import type { CalendarProps, Row } from "./calendar.types";
import { useCalendar } from "./hooks/useCalendar";
import useMonthPicker from "./hooks/useMonthPicker";
import S from "./style/Calendar.style";

type CalendarRowProps = {
	month: number;
	year: number;
	row: Row;
	selectDate: (day: number | null) => void;
	selectedDate?: Maybe<Dayjs>;
	Cell?: ReactNode;
};

function CalendarRow({
	month,
	year,
	row,
	selectDate,
	selectedDate,
}: CalendarRowProps) {
	function is(day: number | null, type: "today" | "selected") {
		const date = type === "today" ? today() : selectedDate;

		if (!date || !day) return false;
		return (
			day === date.date() && month === date.month() && year === date.year()
		);
	}

	return (
		<S.Row>
			{row.map((day, index) => (
				<Buttons.Cell.Default
					disabled={day.date === null}
					key={index}
					onClick={() => selectDate(day.value)}
					$selected={is(day.value, "selected")}
					$highlight={is(day.value, "today")}
				>
					{day.value}
				</Buttons.Cell.Default>
			))}
		</S.Row>
	);
}

export default function Calendar({
	initialDate,
	onChange: setExternalState,
}: CalendarProps) {
	const {
		monthAndYear,
		setMonthAndYear,
		title,
		rows,
		selectDate,
		selectedDate,
	} = useCalendar({
		initialDate,
		onChange: setExternalState,
	});

	const {
		handleMonthChange,
		monthValue,
		handleArrowClick,
		monthPickerRef,
		showMonthPicker,
		setShowMonthPicker,
	} = useMonthPicker({
		initialDate,
		onChange: setMonthAndYear,
	});

	return (
		<S.Calendar>
			{showMonthPicker && (
				<S.MonthPickerWrapper ref={monthPickerRef}>
					<MonthPicker
						flex="1"
						defaultDate={day()
							.year(monthAndYear.year)
							.month(monthAndYear.month)
							.toDate()}
						value={monthValue}
						onChange={handleMonthChange}
						size={"xs"}
					/>
				</S.MonthPickerWrapper>
			)}
			<S.TitleWrapper>
				<S.MonthPickerActionWrapper>
					<Buttons.Action.Direction
						direction="previous"
						onClick={() => handleArrowClick("previous")}
					/>
					<Buttons.Action.Direction
						direction="next"
						onClick={() => handleArrowClick("next")}
					/>
				</S.MonthPickerActionWrapper>
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
		</S.Calendar>
	);
}
