import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { Habit } from "@/types/server/habit.types";
import { useMutation } from "@tanstack/react-query";

async function deleteHabit({ habit_id }: Pick<Habit, "habit_id">) {
	const url = makeAuthorizedUrl(`/data/habit/${habit_id}`);
	return (await fetch(url, createRequestConfig.delete())).json();
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
