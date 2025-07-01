import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

export function useMutateNewActivity() {
	return useMutation(
		trpc.activities.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.all.queryKey()
				});
			}
		})
	);
}
