import type { Datelike } from "@t/data/utility.types";

export type TimeWindow = {
	intervalUnit: "day" | "week" | "month" | "year"; // TODO: name this "interval_unit"? also add an interval field
	startDate: Datelike;
	endDate: Datelike;
};
