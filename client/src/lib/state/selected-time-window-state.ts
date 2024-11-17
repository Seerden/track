import { createDate } from "@/lib/datetime/make-date";
import type { TimeWindow } from "@/types/time-window.types";
import { atom } from "recoil";

/**
 * Global state for the selected time window.
 * @todo this is currently not yet used in the one place where it could be
 * (Today), but it's here for when we do start needing it.
 */
export const selectedTimeWindowState = atom<TimeWindow>({
	default: {
		intervalUnit: "day",
		startDate: createDate(new Date()).startOf("day"),
		endDate: createDate(new Date()).endOf("day")
	},
	key: "selectedTimeWindowState"
});