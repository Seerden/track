import { HABIT_FILTER, TASK_FILTER } from "@shared/lib/schemas/settings";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { habitFilterAtom } from "@/components/Today/habits/habit-filter";
import { tasksFilterAtom } from "@/components/Today/tasks/task-filter";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { trpc } from "@/lib/trpc";

/**
 * Query user settings and set related atom state accordingly.
 * @usage call this as soon as possible on application mount, in conjunction
 * with prefetching/ensuring the query data is present for the relevant queries
 * (like the settings query).
 * @note As long as we're not doing (partial) SSR, this is probably the easiest way to
 * handle this, because async atoms is a weird concept to me.
 */
export function useReconcileSettings() {
	const { isLoggedIn } = useAuthentication();
	const setTaskFilter = useSetAtom(tasksFilterAtom);
	const setHabitFilter = useSetAtom(habitFilterAtom);
	const { data: settings } = useQuery({
		...trpc.users.q.settings.query.queryOptions(),
		enabled: isLoggedIn,
	});

	useEffect(() => {
		if (settings) {
			setTaskFilter(settings.default_task_completion_filter ?? TASK_FILTER.ALL);
			setHabitFilter(
				settings.default_habit_completion_filter ?? HABIT_FILTER.ALL
			);
		}
	}, [
		settings?.default_habit_completion_filter,
		settings?.default_task_completion_filter,
	]);
}
