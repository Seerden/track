import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export default function useMutateTaskCompletion() {
	return useMutation(
		trpc.activities.m.updateCompletion.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.q.all.queryKey(),
				});
			},
		})
	);
}
