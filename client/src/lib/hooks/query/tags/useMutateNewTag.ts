import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";

export function useMutateNewTag() {
	const queryClient = useQueryClient();
	return useMutation(
		trpc.tags.m.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.tags.q.all.queryKey(),
				});
			},
		})
	);
}

export function useMutateTag() {
	const queryClient = useQueryClient();
	return useMutation(
		trpc.tags.m.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.tags.q.pathKey(),
				});
			},
		})
	);
}
