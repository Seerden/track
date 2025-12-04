import {
	TASK_FILTER,
	taskFilterValueSchema,
} from "@shared/lib/schemas/settings";
import type { DeepValue } from "@shared/types/data/utility.types";
import { atom } from "jotai";
import { LucideCheck, LucideCircleDot } from "lucide-react";
import type { RadioGroupOption } from "@/components/Today/BlockHeader";

export { TASK_FILTER, taskFilterValueSchema };

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
