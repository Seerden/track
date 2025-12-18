import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export default function useMutateDeleteHabit() {
	return useMutation(
		trpc.habits.m.delete.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.habits.q.all.queryKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.habits.q.entries.queryKey(),
				});
			},
		})
	);
}
