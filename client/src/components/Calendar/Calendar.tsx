import dayjs from "dayjs";

type CalendarProps = {
	/** Month to focus on initially. */
	month: number;
	/** Year to focus on initially. */
	year: number;
};

export default function Calendar({ month, year }: CalendarProps) {
	const firstDayOfWeek: "monday" | "sunday" = "monday";

	const date = dayjs(new Date(year, month, 1));
	const numberOfDaysInMonth = date.daysInMonth();

	/**
	 * every row in the calendar has 7 days, but the first row may have some
	 * empty cell depending on what day of the week the month starts on
	 * the easiest way to create the rows is to build a list of indexes (index
	 * represents dayOfMonth), prepend that by however many days of the week the
	 * first week is shifted by (e.g. if january 1st falls on thursday, and
	 * monday is specified as the start of a week, then we prepend three empty
	 * cells, and we could represent those by null, or whatever) */

	const weekdayOnFirstDayOfMonth = date.startOf("month").day();
	const firstDayOfMonthOffset =
		weekdayOnFirstDayOfMonth - (firstDayOfWeek === "monday" ? 1 : 0);

	const daysOfMonthForCells: Array<number | null> = Array.from(
		{ length: numberOfDaysInMonth },
		(_, i) => i + 1
	);
	const offsetArray: Array<number | null> = Array.from(
		{ length: firstDayOfMonthOffset },
		() => null
	);
	const dayOfMonthCells = offsetArray.concat(daysOfMonthForCells);

	const rows = dayOfMonthCells.reduce(
		(acc, day, i) => {
			if (!(i % 7)) {
				acc = acc.concat([]);
			}

			acc[acc.length - 1].push(day);

			return acc;
		},
		[] as (null | number)[][]
	);

	// TODO: use dayjs to determine these strings (which allows for localization
	// and customization), and optionally shift the days to allow for any day to
	// be the first day of the week
	const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	return (
		<ul>
			{daysOfWeek.map((day) => (
				<li key={day}>{day}</li>
			))}
			{rows.map((row, i) => (
				<CalendarRow key={i} row={row} />
			))}
		</ul>
	);
}

function CalendarRow({ row }: { row: (null | number)[] }) {
	return (
		<li>
			<ul>
				{row.map((day, j) => (
					<li key={j}>{day ?? ""}</li>
				))}
			</ul>
		</li>
	);
}
