import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export function useMutateNewNote() {
	return useMutation(
		trpc.notes.m.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.notes.q.all.queryKey(),
				});
			},
		})
	);
}
