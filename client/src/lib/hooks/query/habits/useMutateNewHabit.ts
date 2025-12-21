import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";

// TODO TRK-228: I used e.g. type HabitInput here. Since the types now come from
// the backend, do we still need those types? I think so, because they're still
// defined there. We just won't need to import them in the mutation hooks anymore.

export function useMutateNewHabit() {
	const queryClient = useQueryClient();
	return useMutation(
		trpc.habits.m.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.habits.q.all.queryKey(),
				});
			},
		})
	);
}
