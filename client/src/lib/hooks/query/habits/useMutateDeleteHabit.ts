import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

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
