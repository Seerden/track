import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
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
	const url = makeAuthorizedUrl("/data/habit/entry");
	return (await fetch(url, createRequestConfig.put({ input }))).json();
}

export default function useHabitEntryMutation() {
	return useMutation<HabitEntry, unknown, HabitEntryUpdateInput>({
		async mutationFn(habitEntry) {
			return putHabitEntry(habitEntry);
		},
		mutationKey: mk.habits.entries.update
	});
}