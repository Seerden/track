import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { HabitInput, HabitWithIds } from "@t/data/habit.types";
import { useMutation } from "@tanstack/react-query";

async function postNewHabit(input: HabitInput): Promise<HabitWithIds> {
	return api.post<HabitInput, HabitWithIds>({ url: "/data/habit", body: input });
}

export function useNewHabitMutation() {
	return useMutation<HabitWithIds, unknown, HabitInput>({
		async mutationFn(habitInput) {
			return postNewHabit(habitInput);
		},
		mutationKey: mk.habits.new
	});
}
