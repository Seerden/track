import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import type { Data } from "@/types/query.types";
import type {
	HabitEntry,
	HabitEntryUpdateInput,
	SyntheticHabitEntry
} from "@/types/server/habit.types";
import { useMutation } from "@tanstack/react-query";

export type EntryMutationArgs = {
	input: HabitEntry | SyntheticHabitEntry;
	value?: string;
};

export type EntryMutationFunction = (args: EntryMutationArgs) => void;

async function putHabitEntry(input: HabitEntryUpdateInput) {
	const url = makeAuthorizedUrl("/data/habit/entry");
	return (await fetch(url, createRequestConfig.put({ input }))).json();
}

export default function useHabitEntryMutation() {
	return useMutation<HabitEntry, unknown, Data<"input", HabitEntryUpdateInput>>({
		async mutationFn(habitEntry) {
			return putHabitEntry(habitEntry.input);
		},
		mutationKey: ["habit-entry"]
	});
}
