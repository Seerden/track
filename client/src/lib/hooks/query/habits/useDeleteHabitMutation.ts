import api from "@/lib/fetch/api";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { Habit } from "@t/data/habit.types";
import { useMutation } from "@tanstack/react-query";

async function deleteHabit({ habit_id }: Pick<Habit, "habit_id">) {
	return api.delete<Pick<Habit, "habit_id">>({ url: `/data/habit/${habit_id}` });
}

export default function useHabitDeleteMutation() {
	return useMutation<Pick<Habit, "habit_id">, unknown, Pick<Habit, "habit_id">>({
		async mutationFn(habit) {
			return deleteHabit(habit);
		},
		mutationKey: mk.habits.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: qk.habits.all, exact: true });
			queryClient.invalidateQueries({ queryKey: qk.habits.entries, exact: true });
		}
	});
}
