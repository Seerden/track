import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { mk } from "@/lib/query-keys";
import type { HabitEntry, HabitEntryInput } from "@/types/server/habit.types";
import { useMutation } from "@tanstack/react-query";

async function postHabitEntry({ habitEntry }: HabitEntryInput) {
	const url = makeAuthorizedUrl("/data/habit/entry");
	return (await fetch(url, createRequestConfig.post({ habitEntry }))).json();
}

export default function useNewHabitEntryMutation() {
	return useMutation<HabitEntry, unknown, HabitEntryInput>({
		async mutationFn({ habitEntry }) {
			return postHabitEntry({ habitEntry });
		},
		mutationKey: mk.habits.entries.new
	});
}
