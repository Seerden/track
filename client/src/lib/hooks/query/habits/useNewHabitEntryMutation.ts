import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { HabitEntry, HabitEntryInput } from "@t/data/habit.types";
import { useMutation } from "@tanstack/react-query";

async function postHabitEntry(input: HabitEntryInput) {
	return api.post<HabitEntryInput, HabitEntry>({
		url: "/data/habit/entry",
		body: input
	});
}

export default function useNewHabitEntryMutation() {
	return useMutation<HabitEntry, unknown, HabitEntryInput>({
		async mutationFn({ habitEntry }) {
			return postHabitEntry({ habitEntry });
		},
		mutationKey: mk.habits.entries.new
	});
}
