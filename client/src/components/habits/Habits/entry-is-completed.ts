import type {
	HabitEntry,
	HabitWithEntries,
	SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";

/** Given an entry and its template habit, determine if the entry is "done". */
export function habitEntryIsDone({
	habit,
	entry,
}: {
	habit: HabitWithEntries;
	entry: HabitEntry | SyntheticHabitEntry;
}) {
	if (isSynthetic(entry)) return false;

	switch (habit.goal_type) {
		case "goal":
			// TODO: should refine the habit type so that goal is always defined
			// when goal_type is "goal"
			return !habit.goal ? false : +entry.value >= habit.goal;
		case "checkbox":
			return entry.value === "true";
	}
}
