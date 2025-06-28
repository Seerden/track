import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

export default function useMutateTaskCompletion() {
	return useMutation(
		trpc.activities.updateCompletion.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: qk.activities.all });
			}
		})
	);
}
