import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { localUser } from "@/lib/user-storage";

export function useLoginMutation() {
	return useMutation(
		trpc.auth.login.mutationOptions({
			onSuccess: ({ user }) => {
				localUser.set(user);
				queryClient.invalidateQueries({ queryKey: trpc.auth.me.queryKey() });
			},
		})
	);
}
