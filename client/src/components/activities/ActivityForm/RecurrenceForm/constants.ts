import type { NewRecurrenceState } from "@/components/activities/ActivityForm/RecurrenceForm/useRecurrenceForm";
import day from "@/lib/dayjs";
import type { DayOfWeek } from "@shared/types/data/utility.types";

/** ["Sunday", "Monday", ...] */
export const daysOfWeek = day.weekdays() as DayOfWeek[];

/** An array containing days of the month -- [[1..7], [...]] */
export const daysOfMonth = Array.from({ length: 31 }, (_, index) => index).reduce(
	(acc, cur) => {
		const day = cur + 1;

		if (!(cur % 7)) {
			acc.push([day]);
		} else {
			acc.at(-1)?.push(day);
		}
		return acc;
	},
	[] as number[][]
);

export enum FREQUENCY {
	NUMERIC = "numeric",
	CALENDAR = "calendar"
}

export enum INTERVAL_UNIT {
	DAY = "day",
	WEEK = "week",
	MONTH = "month"
}

export const frequencyOptions: `${FREQUENCY}`[] = ["numeric", "calendar"];

export const defaultRecurrence: NewRecurrenceState = {
	start_timestamp: new Date().toISOString(),
	interval: 1,
	interval_unit: "day",
	monthdays: null,
	weekdays: null,
	frequency: "numeric",
	end_timestamp: null
};
