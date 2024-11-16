import type { Datelike } from "@/types/date.types";

export type TimeWindow = {
	intervalUnit: "day" | "week" | "month" | "year"; // TODO: name this "interval_unit"? also add an interval field
	startDate: Datelike;
	endDate: Datelike;
};
