import type { Dayjs } from "dayjs";

export type CalendarProps = {
	/** Day to focus on initially. */
	initialDay: number;
	/** Month to focus on initially. */
	initialMonth: number;
	/** Year to focus on initially. */
	initialYear: number;
	/** Function to set the selected date. */
	onChange?: React.Dispatch<React.SetStateAction<Dayjs>>;
};

export type MonthAndYear = {
	month: number;
	year: number;
};

export type WeekStartDay = "monday" | "sunday";
export type Cell = number | null;
export type Row = Cell[];
export type Rows = Row[];
