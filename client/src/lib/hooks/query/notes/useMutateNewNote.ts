import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

export function useMutateNewNote() {
	return useMutation(
		trpc.notes.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.notes.all.queryKey(),
				});
			},
		})
	);
}
