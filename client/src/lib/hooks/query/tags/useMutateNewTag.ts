import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export function useMutateNewTag() {
	return useMutation(
		trpc.tags.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.tags.all.queryKey(),
				});
			},
		})
	);
}
