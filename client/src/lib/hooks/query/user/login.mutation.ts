import { useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultQueryConfig } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { localUser } from "@/lib/user-storage";

export function useLoginMutation() {
	const queryClient = useQueryClient();

	return useMutation(
		trpc.auth.login.mutationOptions({
			onSuccess: ({ user }) => {
				localUser.set(user);

				queryClient.setDefaultOptions({
					...defaultQueryConfig,
					queries: {
						...defaultQueryConfig,
						enabled: true,
					},
				});
				queryClient.invalidateQueries({ queryKey: trpc.auth.me.queryKey() });
			},
		})
	);
}
