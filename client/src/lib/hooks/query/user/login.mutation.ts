import { captureMessage } from "@sentry/react";
import type { NewUser } from "@shared/lib/schemas/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "better-auth";
import { authClient } from "@/lib/auth-client";
import { defaultQueryConfig } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export function useLoginMutation() {
	const queryClient = useQueryClient();

	return useMutation<User, unknown, NewUser>({
		mutationFn: async (input) => {
			const { data } = await authClient.signIn.username(input);
			if (!data) {
				throw new Error("username signIn did not return any data");
			}
			return data.user;
		},
		onSuccess: (user) => {
			queryClient.setDefaultOptions({
				...defaultQueryConfig,
				queries: {
					...defaultQueryConfig.queries,
					enabled: true,
				},
			});
			queryClient.invalidateQueries({ queryKey: trpc.users.q.me.queryKey() });

			captureMessage(`User "${user?.email}" logged in`, "log");
		},
	});
}
