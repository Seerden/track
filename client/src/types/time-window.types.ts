import type { IntervalUnit } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";

export type TimeWindow = {
	intervalUnit: IntervalUnit; // TODO: name this "interval_unit"? also add an interval field
	startDate: Dayjs;
	endDate: Dayjs;
};
