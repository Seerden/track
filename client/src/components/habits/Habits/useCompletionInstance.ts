import type { PossiblySyntheticHabitEntry } from "@shared/lib/schemas/habit";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import { useMutation } from "@tanstack/react-query";
import { syntheticToReal } from "@/components/habits/Habits/synthetic";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export default function useCompletionInstance() {
	const { mutate: submitNewEntry } = useMutation(
		trpc.habits.m.createEntry.mutationOptions()
	);
	const { mutate: putEntry } = useMutation(
		trpc.habits.m.updateEntry.mutationOptions()
	);

	function doMutation({
		input,
		value,
	}: {
		input: PossiblySyntheticHabitEntry;
		value?: string;
	}) {
		function onSuccess() {
			queryClient.invalidateQueries({
				queryKey: trpc.habits.q.entries.queryKey(),
			});
			queryClient.invalidateQueries({
				queryKey: trpc.habits.q.all.queryKey(),
			});
		}

		if (value === undefined || value === "") return;

		if (isSynthetic(input)) {
			const realEntry = syntheticToReal({
				entry: input,
				value,
			});
			submitNewEntry(realEntry, { onSuccess });
		} else {
			putEntry({ ...input, value }, { onSuccess });
		}
	}

	return { doMutation };
}
