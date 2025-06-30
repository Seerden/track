import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

export default function useMutateTaskCompletion() {
	return useMutation(
		trpc.activities.updateCompletion.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: trpc.activities.all.queryKey() });
			}
		})
	);
}
