import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import type { HabitInput, HabitWithIds } from "@/types/server/habit.types";
import { useMutation } from "@tanstack/react-query";

async function postNewHabit({ habit, tagIds }: HabitInput): Promise<HabitWithIds> {
	const url = makeAuthorizedUrl("/data/habit");
	const insertedHabit: Promise<HabitWithIds> = (
		await fetch(url, createRequestConfig.post({ habit, tagIds }))
	).json();

	return insertedHabit;
}

export function useNewHabitMutation() {
	return useMutation<HabitWithIds, unknown, HabitInput>({
		async mutationFn(habitInput) {
			return postNewHabit(habitInput);
		},
		mutationKey: ["new-habit"]
	});
}
