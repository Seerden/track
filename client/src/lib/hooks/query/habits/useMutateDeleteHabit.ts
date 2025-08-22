import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export default function useMutateDeleteHabit() {
	return useMutation(
		trpc.habits.delete.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: trpc.habits.all.queryKey() });
				queryClient.invalidateQueries({
					queryKey: trpc.habits.entries.queryKey(),
				});
			},
		})
	);
}
