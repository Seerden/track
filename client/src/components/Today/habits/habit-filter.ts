import {
	HABIT_FILTER,
	habitFilterValueSchema,
} from "@shared/lib/schemas/settings";
import type { DeepValue } from "@shared/types/data/utility.types";
import { atom } from "jotai";
import { LucideCheck, LucideCheckCheck, LucideCircleDot } from "lucide-react";
import type { RadioGroupOption } from "@/components/Today/BlockHeader";
export { HABIT_FILTER, habitFilterValueSchema };

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
