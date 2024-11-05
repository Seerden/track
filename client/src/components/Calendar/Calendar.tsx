import type { CalendarProps, Row } from "@/components/Calendar/calendar.types";
import { useCalendar } from "@/components/Calendar/hooks/use-calendar";
import useMonthPicker from "@/components/Calendar/hooks/use-month-picker";
import { daysOfWeekShort } from "@/lib/datetime/weekdays";
import type { Maybe } from "@/types/server/utility.types";
import { MonthPicker } from "@mantine/dates";
import type { Dayjs } from "dayjs";
import S from "./Calendar.style";

type CalendarRowProps = {
	month: number;
	year: number;
	row: Row;
	selectDate: (day: number | null) => void;
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
					onClick={() => selectDate(day)}
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
	onChange: setExternalState
}: CalendarProps) {
	const { monthAndYear, setMonthAndYear, title, rows, selectDate, selectedDate } =
		useCalendar({
			initialMonth,
			initialYear,
			onChange: setExternalState
		});

	const { handleMonthChange, showMonthPicker, setShowMonthPicker, monthValue } =
		useMonthPicker({ initialMonth, initialYear, onChange: setMonthAndYear });

	return (
		<S.Calendar>
			{showMonthPicker && (
				<S.MonthPickerWrapper>
					<MonthPicker
						flex="1"
						value={monthValue}
						onChange={handleMonthChange}
						size={"xs"}
					/>
				</S.MonthPickerWrapper>
			)}
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
		</S.Calendar>
	);
}
