import type { Datelike } from "@shared/lib/schemas/timestamp";
import type { Nullable } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";

export type CalendarProps = {
	/** The active date when the calendar mounts. */
	initialDate: Dayjs;
	/** Function to set the selected date. */
	onChange?: React.Dispatch<React.SetStateAction<Dayjs>>;
};

export type MonthAndYear = {
	month: number;
	year: number;
};

export type WeekStartDay = "monday" | "sunday";
export type Cell = { date: Nullable<Datelike>; value: Nullable<number> };
export type Row = Cell[];
export type Rows = Row[];
