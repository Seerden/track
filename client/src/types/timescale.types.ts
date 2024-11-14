import type { Datelike } from "@/types/date.types";

export type Timescale = {
	type: "day" | "week" | "month" | "year"; // TODO: name this "interval_unit"? also add an interval field
	startDate: Datelike;
	endDate: Datelike;
};
