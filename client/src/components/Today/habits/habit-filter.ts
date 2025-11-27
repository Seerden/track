import type { DeepValue } from "@shared/types/data/utility.types";
import { atom } from "jotai";
import { LucideCheck, LucideCheckCheck, LucideCircleDot } from "lucide-react";
import type { RadioGroupOption } from "@/components/Today/BlockHeader";

export const HABIT_FILTER = {
	ALL: "all",
	TODAY: "completed-today",
	INTERVAL: "completed-interval",
} as const;

export type HabitFilter = DeepValue<typeof HABIT_FILTER>;

export const habitSelectionRadioOptions: RadioGroupOption[] = [
	{
		value: HABIT_FILTER.ALL,
		tooltipLabel: "Show all habits",
		Icon: LucideCircleDot,
	},
	{
		value: HABIT_FILTER.TODAY,
		tooltipLabel: "Hide habits completed today",
		Icon: LucideCheck,
	},
	{
		value: HABIT_FILTER.INTERVAL,
		tooltipLabel: "Hide habits completed in their interval",
		Icon: LucideCheckCheck,
	},
];

export const habitFilterAtom = atom<HabitFilter>(HABIT_FILTER.ALL);
