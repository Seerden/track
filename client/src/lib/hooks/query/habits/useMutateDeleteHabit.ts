import habitService from "@/lib/fetch/habit-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { Habit } from "@t/data/habit.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateDeleteHabit() {
	return useMutation<Pick<Habit, "habit_id">, unknown, Pick<Habit, "habit_id">>({
		async mutationFn(habit) {
			return habitService.delete(habit);
		},
		mutationKey: mk.habits.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: qk.habits.all, exact: true });
			queryClient.invalidateQueries({ queryKey: qk.habits.entries, exact: true });
		}
	});
}
