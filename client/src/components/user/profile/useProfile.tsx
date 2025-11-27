import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { type ChangeEvent, useCallback } from "react";
import {
	habitFilterAtom,
	habitFilterValueSchema,
} from "@/components/Today/habits/habit-filter";
import {
	taskFilterValueSchema,
	tasksFilterAtom,
} from "@/components/Today/tasks/task-filter";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export function useProfile() {
	const { currentUser, logout } = useAuthentication();
	const { data: settings } = useQuery(trpc.user.settings.query.queryOptions());
	const setHabitFilter = useSetAtom(habitFilterAtom);
	const setTaskFilter = useSetAtom(tasksFilterAtom);
	const { mutate: mutateUpdateSettings } = useMutation(
		trpc.user.settings.update.mutationOptions({
			onSuccess: (_data) => {
				queryClient.invalidateQueries({
					queryKey: trpc.user.settings.query.queryKey(),
				});
			},
		})
	);

	const disableNotifications = Boolean(settings?.disable_notifications);

	const handleToggleDisableNotifications = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();

			const state = Boolean(settings?.disable_notifications);
			mutateUpdateSettings({ disable_notifications: !state });
		},
		[settings, mutateUpdateSettings]
	);

	function handleSetTaskFilter(value: string) {
		const parsedValue = taskFilterValueSchema.safeParse(value);
		if (!parsedValue.success) {
			return;
		}

		mutateUpdateSettings(
			{
				default_task_completion_filter: parsedValue.data,
			},
			{
				onSuccess: (data) => {
					if (data?.default_task_completion_filter) {
						setTaskFilter(data.default_task_completion_filter);
					}
				},
			}
		);
	}

	function handleSetHabitFilter(value: string) {
		const parsedValue = habitFilterValueSchema.safeParse(value);
		if (!parsedValue.success) {
			return;
		}

		mutateUpdateSettings(
			{
				default_habit_completion_filter: parsedValue.data,
			},
			{
				onSuccess: (data) => {
					if (data?.default_habit_completion_filter) {
						setHabitFilter(data.default_habit_completion_filter);
					}
				},
			}
		);
	}

	const handlers = {
		toggleNotifications: handleToggleDisableNotifications,
		updateTaskFilter: handleSetTaskFilter,
		updateHabitFilter: handleSetHabitFilter,
	};

	return {
		handlers,
		disableNotifications,
		defaultTaskFilter: settings?.default_task_completion_filter,
		defaultHabitFilter: settings?.default_habit_completion_filter,
		currentUser,
		logout,
		settings,
	};
}
