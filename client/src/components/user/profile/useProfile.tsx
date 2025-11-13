import { useMutation, useQuery } from "@tanstack/react-query";
import { type ChangeEvent, useCallback } from "react";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export function useProfile() {
	const { currentUser, logout } = useAuthentication();
	const { data: settings } = useQuery(trpc.user.settings.query.queryOptions());
	const { mutate } = useMutation(trpc.user.settings.update.mutationOptions({}));

	const disableNotifications = Boolean(settings?.disable_notifications);

	const handleToggleDisableNotifications = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();

			const state = Boolean(settings?.disable_notifications);
			mutate(
				{ disable_notifications: !state },
				{
					onSuccess: (data) => {
						queryClient.invalidateQueries({
							queryKey: trpc.user.settings.query.queryKey(),
						});
					},
				}
			);
		},
		[settings, mutate]
	);

	const handlers = {
		toggleNotifications: handleToggleDisableNotifications,
	};

	return {
		handlers,
		disableNotifications,
		currentUser,
		logout,
	};
}
