import { HABIT_FILTER, TASK_FILTER } from "@shared/lib/schemas/settings";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { habitFilterAtom } from "@/components/Today/habits/habit-filter";
import { tasksFilterAtom } from "@/components/Today/tasks/task-filter";
import { trpc } from "@/lib/trpc";

export function useReconcileSettings() {
	const setTaskFilter = useSetAtom(tasksFilterAtom);
	const setHabitFilter = useSetAtom(habitFilterAtom);
	const { data: settings } = useSuspenseQuery(
		trpc.user.settings.query.queryOptions()
	);
	useEffect(() => {
		setTaskFilter(settings.default_task_completion_filter ?? TASK_FILTER.ALL);
		setHabitFilter(
			settings.default_habit_completion_filter ?? HABIT_FILTER.ALL
		);
	}, []);
}
