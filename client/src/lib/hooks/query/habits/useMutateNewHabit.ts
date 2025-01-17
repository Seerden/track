import habitService from "@/lib/fetch/habit-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { HabitInput, HabitWithIds } from "@shared/types/data/habit.types";
import { useMutation } from "@tanstack/react-query";

export function useMutateNewHabit() {
	return useMutation<HabitWithIds, unknown, HabitInput>({
		async mutationFn(habitInput) {
			return habitService.post(habitInput);
		},
		mutationKey: mk.habits.new,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: qk.habits.all
			});
		}
	});
}
