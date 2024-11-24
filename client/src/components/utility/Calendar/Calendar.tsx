import type { CalendarProps, Row } from "@/components/utility/Calendar/calendar.types";
import { useCalendar } from "@/components/utility/Calendar/hooks/useCalendar";
import useMonthPicker from "@/components/utility/Calendar/hooks/useMonthPicker";
import { daysOfWeekShort } from "@/lib/datetime/weekdays";
import { Cell } from "@/lib/theme/components/buttons";
import { MonthPicker } from "@mantine/dates";
import type { Maybe } from "@t/data/utility.types";
import type { Dayjs } from "dayjs";
import S from "./style/Calendar.style";

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
				<Cell.Default
					disabled={day === null}
					width={30}
					key={index}
					onClick={() => selectDate(day)}
					$selected={isSelected(day)}
				>
					{day}
				</Cell.Default>
			))}
		</S.Row>
	);
}

export default function Calendar({
	initialDate,
	onChange: setExternalState
}: CalendarProps) {
	const { monthAndYear, setMonthAndYear, title, rows, selectDate, selectedDate } =
		useCalendar({
			initialDate,
			onChange: setExternalState
		});

	const { handleMonthChange, showMonthPicker, setShowMonthPicker, monthValue } =
		useMonthPicker({ initialDate, onChange: setMonthAndYear });

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
