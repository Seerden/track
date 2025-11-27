import type { DeepValue } from "@shared/types/data/utility.types";
import { atom } from "jotai";
import { LucideCheck, LucideCircleDot } from "lucide-react";
import type { RadioGroupOption } from "@/components/Today/BlockHeader";

export const TASK_FILTER = {
	ALL: "all",
	COMPLETED: "completed",
} as const;

export const taskFilterRadioOptions: RadioGroupOption[] = [
	{
		tooltipLabel: "Show all tasks",
		Icon: LucideCircleDot,
		value: "all",
	},
	{
		tooltipLabel: "Hide completed tasks",
		Icon: LucideCheck,
		value: "completed",
	},
];

export type TaskFilter = DeepValue<typeof TASK_FILTER>;

export const tasksFilterAtom = atom<TaskFilter>(TASK_FILTER.ALL);
