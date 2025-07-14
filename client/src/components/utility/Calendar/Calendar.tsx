import type { CalendarProps, Row } from "@/components/utility/Calendar/calendar.types";
import { useCalendar } from "@/components/utility/Calendar/hooks/useCalendar";
import useMonthPicker from "@/components/utility/Calendar/hooks/useMonthPicker";
import { today } from "@/lib/datetime/make-date";
import { daysOfWeekShort } from "@/lib/datetime/weekdays";
import Buttons from "@/lib/theme/components/buttons";
import { MonthPicker } from "@mantine/dates";
import type { Maybe } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import S from "./style/Calendar.style";

type CalendarRowProps = {
	month: number;
	year: number;
	row: Row;
	selectDate: (day: number | null) => void;
	selectedDate?: Maybe<Dayjs>;
};

function CalendarRow({ month, year, row, selectDate, selectedDate }: CalendarRowProps) {
	function is(day: number | null, type: "today" | "selected") {
		const date = type === "today" ? today() : selectedDate;

		if (!date || !day) return false;
		return day === date.date() && month === date.month() && year === date.year();
	}

	return (
		<S.Row>
			{row.map((day, index) => (
				<Buttons.Cell.Default
					disabled={day === null}
					key={index}
					onClick={() => selectDate(day)}
					$selected={is(day, "selected")}
					$highlight={is(day, "today")}
				>
					{day}
				</Buttons.Cell.Default>
			))}
		</S.Row>
	);
}

type AdjacentMonthButtonProps = {
	direction: "previous" | "next";
	onClick: () => void;
	size?: number;
};

function AdjacentMonthButton({ direction, onClick }: AdjacentMonthButtonProps) {
	const Icon = direction === "next" ? LucideChevronRight : LucideChevronLeft;
	return (
		<S.MonthPickerAction type="button" $direction={direction} onClick={onClick}>
			<Icon size={22} />
		</S.MonthPickerAction>
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

	const {
		handleMonthChange,
		monthValue,
		handleArrowClick,
		monthPickerRef,
		showMonthPicker,
		setShowMonthPicker
	} = useMonthPicker({
		initialDate,
		onChange: setMonthAndYear
	});

	return (
		<S.Calendar>
			{showMonthPicker && (
				<S.MonthPickerWrapper ref={monthPickerRef}>
					<MonthPicker
						flex="1"
						value={monthValue}
						onChange={handleMonthChange}
						size={"xs"}
					/>
				</S.MonthPickerWrapper>
			)}
			<S.TitleWrapper>
				<S.MonthPickerActionWrapper>
					<AdjacentMonthButton
						direction="previous"
						onClick={() => handleArrowClick("previous")}
					/>
					<AdjacentMonthButton
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
