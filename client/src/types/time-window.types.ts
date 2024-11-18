import type { Dayjs } from "dayjs";

export type TimeWindow = {
	intervalUnit: "day" | "week" | "month" | "year"; // TODO: name this "interval_unit"? also add an interval field
	startDate: Dayjs;
	endDate: Dayjs;
};
