import dayjs from "dayjs";
import S from "./Calendar.style";

type Cell = number | null;
type Row = Cell[];
type Rows = Row[];

function useCalendar({ month, year }: CalendarProps) {
	const firstDayOfWeek: "monday" | "sunday" = "monday";

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
	// be the first day of the week
	const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const title = dayjs(new Date(year, month, 1)).format("MMMM YYYY");

	return {
		rows,
		daysOfWeek,
		title
	} as const;
}

type CalendarRowProps = {
	row: Row;
};

function CalendarRow({ row }: CalendarRowProps) {
	return (
		<S.Row>
			{row.map((day, index) => (
				<S.Cell key={index}>{day}</S.Cell>
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
	const { title, daysOfWeek, rows } = useCalendar({ month, year });

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
					<CalendarRow key={i} row={row} />
				))}
			</S.Rows>
		</S.Calendar>
	);
}
