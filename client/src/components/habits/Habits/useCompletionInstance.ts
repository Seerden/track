import { syntheticToReal } from "@/components/habits/Habits/synthetic";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import type { HabitEntry, SyntheticHabitEntry } from "@shared/lib/schemas/habit";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import { useMutation } from "@tanstack/react-query";

export default function useCompletionInstance() {
	const { mutate: submitNewEntry } = useMutation(
		trpc.habits.createEntry.mutationOptions()
	);
	const { mutate: putEntry } = useMutation(trpc.habits.updateEntry.mutationOptions());
	const { currentUser } = useAuthentication();

	const user_id = currentUser?.user_id;

	function doMutation({
		input,
		value
	}: {
		input: HabitEntry | SyntheticHabitEntry;
		value?: string;
	}) {
		function onSuccess() {
			queryClient.invalidateQueries({
				queryKey: trpc.habits.entries.queryKey()
			});
			queryClient.invalidateQueries({
				queryKey: trpc.habits.all.queryKey()
			});
		}

		if (!user_id) return;

		if (value === undefined || value === "") return;

		if (isSynthetic(input)) {
			const realEntry = syntheticToReal({
				entry: input,
				user_id,
				value
			});
			submitNewEntry(realEntry, { onSuccess });
		} else {
			putEntry({ ...input, value }, { onSuccess });
		}
	}

	return { doMutation };
}
