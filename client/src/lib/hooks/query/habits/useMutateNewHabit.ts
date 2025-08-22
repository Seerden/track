import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

// TODO TRK-228: I used e.g. type HabitInput here. Since the types now come from
// the backend, do we still need those types? I think so, because they're still
// defined there. We just won't need to import them in the mutation hooks anymore.

export function useMutateNewHabit() {
	return useMutation(
		trpc.habits.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.habits.all.queryKey(),
				});
			},
		})
	);
}
