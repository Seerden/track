import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type {
	HabitEntry,
	HabitEntryUpdateInput,
	SyntheticHabitEntry
} from "@t/data/habit.types";
import { useMutation } from "@tanstack/react-query";

export type HabitEntryUpdateMutationArgs = {
	input: HabitEntry | SyntheticHabitEntry;
	value?: string;
};

export type HabitEntryUpdateMutationFunction = (
	args: HabitEntryUpdateMutationArgs
) => void;

async function putHabitEntry(input: HabitEntryUpdateInput) {
	return api.put<HabitEntryUpdateInput, HabitEntry>({
		url: "/data/habit/entry",
		body: input
	});
}

export default function useHabitEntryMutation() {
	return useMutation<HabitEntry, unknown, HabitEntryUpdateInput>({
		async mutationFn(habitEntry) {
			return putHabitEntry(habitEntry);
		},
		mutationKey: mk.habits.entries.update
	});
}
