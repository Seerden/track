import { syntheticToReal } from "@/components/habits/HabitEntryItem/synthetic";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { queryClient } from "@/lib/query-client";
import useHabitEntryMutation from "@/lib/query/habits/useHabitEntryMutation";
import useNewHabitEntryMutation from "@/lib/query/habits/useNewHabitEntryMutation";
import { isSynthetic } from "@/types/server/habit-entry.guards";
import type { HabitEntry, SyntheticHabitEntry } from "@/types/server/habit.types";

export default function useCompletionInstance() {
	const { mutate: submitNewEntry } = useNewHabitEntryMutation();
	const { mutate: putEntry } = useHabitEntryMutation();
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
			queryClient.invalidateQueries({ queryKey: ["habit-entries"], exact: true });
			queryClient.invalidateQueries({ queryKey: ["habits"], exact: true });
		}

		if (!user_id) return;

		if (isSynthetic(input)) {
			if (value === undefined) return;

			const realEntry = syntheticToReal({
				entry: input,
				user_id,
				value
			});
			submitNewEntry({ habitEntry: realEntry }, { onSuccess });
		} else {
			putEntry({ input: { ...input, ...(value && { value }) } }, { onSuccess }); // TODO: I don't like that i have to manually add value, fix the type and names to make this intuitive
			// TODO ^ note above is because submitNewEntry and putEntry have
			// different signatures and I wasn't accounting for that
		}
	}

	return { doMutation };
}