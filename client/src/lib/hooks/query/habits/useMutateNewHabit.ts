import { postNewHabit } from "@/lib/fetch/habit-service";
import { mk } from "@/lib/query-keys";
import type { HabitInput, HabitWithIds } from "@t/data/habit.types";
import { useMutation } from "@tanstack/react-query";

export function useMutateNewHabit() {
	return useMutation<HabitWithIds, unknown, HabitInput>({
		async mutationFn(habitInput) {
			return postNewHabit(habitInput);
		},
		mutationKey: mk.habits.new
	});
}
