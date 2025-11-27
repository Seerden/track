import { useMutation, useQuery } from "@tanstack/react-query";
import { type ChangeEvent, useCallback } from "react";
import { habitFilterValueSchema } from "@/components/Today/habits/habit-filter";
import { taskFilterValueSchema } from "@/components/Today/tasks/task-filter";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export function useSettings() {
	const { currentUser, logout } = useAuthentication();
	const { data: settings } = useQuery(trpc.user.settings.query.queryOptions());
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

	// note: we don't set the taskFilter atom on success, because
	// useReconcileSettings already handles updating the atom when the query
	// value changes.
	function handleSetTaskFilter(value: string) {
		const parsedValue = taskFilterValueSchema.safeParse(value);
		if (!parsedValue.success) {
			return;
		}

		mutateUpdateSettings({
			default_task_completion_filter: parsedValue.data,
		});
	}

	// note: we don't set the habitFilter atom on success, because
	// useReconcileSettings already handles updating the atom when the query
	// value changes.
	function handleSetHabitFilter(value: string) {
		const parsedValue = habitFilterValueSchema.safeParse(value);
		if (!parsedValue.success) {
			return;
		}

		mutateUpdateSettings({
			default_habit_completion_filter: parsedValue.data,
		});
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
