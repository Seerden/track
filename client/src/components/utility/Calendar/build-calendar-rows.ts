import type { Dayjs } from "dayjs";
import type { Row, Rows, WeekStartDay } from "./calendar.types";

/**
 * Every row in a calendar has 7 cells (1 cell for each weekday), but the first
 * (and last) rows may have some empty cells, depending on what day of the week
 * the month starts on.
 */

/*
 * We'll build the rows as follows:
 * (1) create an array of indexes (where each index represents the day of the month)
 *   (e.g. [1, 2, 3, ..., 31])
 * (2) prepend the days of the month by however many days of the week the first
 *   week is shifted by (e.g. if january 1st falls on thursday, and monday is
 *   specified as the start of a week, then we prepend three "empty" (null) cells.
 */

/** Given a Dayjs object, build a (null|number)[] that contains the cells
 * required to display a calendar. Null cells represent days belonging
 * to other months, numbered cells refer to the days of the month (e.g. 1 refers
 * to the first day of the month, etc.)
 *
 * @param date the Dayjs object from which we extract the month and year to use
 * for the calendar view. We could also pass in a month and year separately, but
 * this is slightly more convenient.
 */
export function buildCalendarRows(date: Dayjs) {
	const firstDayOfWeek: WeekStartDay = "monday"; // TODO: make this user-configurable and allow any day of the week

	const startOfWeekOffset = firstDayOfWeek === "monday" ? 6 : 0;
	const firstOfMonthDay = (date.startOf("month").day() + startOfWeekOffset) % 7;
	const lastOfMonthDay = (date.endOf("month").day() + startOfWeekOffset) % 7;

	const nonEmptyCells: Row = Array.from({ length: date.daysInMonth() }, (_, i) => i + 1);
	const emptyCellsStart: Row = Array.from({ length: firstOfMonthDay }, () => null);
	const emptyCellsEnd: Row = Array.from({ length: 6 - lastOfMonthDay }, () => null);
	const cells: Row = emptyCellsStart.concat(nonEmptyCells).concat(emptyCellsEnd);

	const rows: Rows = [];
	let i = 0;
	while (i < cells.length) {
		const slice: Row = cells.slice(i, i + 7);
		rows.push(slice);
		i += 7;
	}

	return rows;
}
