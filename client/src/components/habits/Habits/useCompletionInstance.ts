import { syntheticToReal } from "@/components/habits/Habits/synthetic";
import useHabitEntryMutation from "@/lib/hooks/query/habits/useHabitEntryMutation";
import useNewHabitEntryMutation from "@/lib/hooks/query/habits/useNewHabitEntryMutation";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { isSynthetic } from "@t/data/habit-entry.guards";
import type { HabitEntry, SyntheticHabitEntry } from "@t/data/habit.types";

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
			queryClient.invalidateQueries({
				queryKey: qk.habits.entries,
				exact: true
			});
			queryClient.invalidateQueries({
				queryKey: qk.habits.all,
				exact: true
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
			submitNewEntry({ habitEntry: realEntry }, { onSuccess });
		} else {
			putEntry({ ...input, value }, { onSuccess });
		}
	}

	return { doMutation };
}
