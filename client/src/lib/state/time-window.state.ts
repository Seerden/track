import { now } from "@/lib/datetime/make-date";
import { TimeWindow } from "@/types/time-window.types";
import { IntervalUnit } from "@shared/types/data/utility.types";
import { atom } from "jotai";

export const defaultSelectedTimeWindow = {
	intervalUnit: "day" as IntervalUnit,
	startDate: now().startOf("day"),
	endDate: now().endOf("day")
};

export const timeWindowAtom = atom<TimeWindow>(defaultSelectedTimeWindow);
