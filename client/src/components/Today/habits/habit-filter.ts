import type { DeepValue } from "@shared/types/data/utility.types";
import { atom } from "jotai";
import { LucideCheck, LucideCheckCheck, LucideCircleDot } from "lucide-react";

export const HABIT_FILTER = {
	ALL: "all",
	TODAY: "completed-today",
	INTERVAL: "completed-interval",
} as const;

export type HabitFilter = DeepValue<typeof HABIT_FILTER>;

export const habitSelectionRadioOptions = [
	{
		value: HABIT_FILTER.ALL,
		tooltipLabel: "show all habits",
		Icon: LucideCircleDot,
	},
	{
		value: HABIT_FILTER.TODAY,
		tooltipLabel: "hide if completed today",
		Icon: LucideCheck,
	},
	{
		value: HABIT_FILTER.INTERVAL,
		tooltipLabel: "hide if completed in interval",
		Icon: LucideCheckCheck,
	},
];

export const habitFilterAtom = atom<HabitFilter>(HABIT_FILTER.ALL);
