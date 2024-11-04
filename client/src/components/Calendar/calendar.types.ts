import type { Maybe } from "@/types/server/utility.types";
import type { Dayjs } from "dayjs";

export type CalendarProps = {
	/** Month to focus on initially. */
	initialMonth: number;
	/** Year to focus on initially. */
	initialYear: number;
	/** Function to set the selected date. */
	setState?: React.Dispatch<React.SetStateAction<Maybe<Dayjs>>>;
};

export type MonthAndYear = {
	month: number;
	year: number;
};

export type WeekStartDay = "monday" | "sunday";
export type Cell = number | null;
export type Row = Cell[];
export type Rows = Row[];
