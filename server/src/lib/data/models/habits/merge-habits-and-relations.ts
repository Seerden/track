import type {
	Habit,
	HabitEntry,
	HabitWithEntries,
} from "@shared/lib/schemas/habit";
import type { HabitTagRelation } from "@shared/types/data/relational.types";

export function mergeHabitsAndRelations(
	habits: Habit[],
	habitTagRelations: HabitTagRelation[],
	entries: HabitEntry[],
) {
	const habitMap = new Map<Habit["habit_id"], HabitWithEntries>();
	for (const habit of habits) {
		habitMap.set(habit.habit_id, {
			...habit,
			tag_ids: [],
			entries: [],
		});
	}

	for (const { habit_id, tag_id } of habitTagRelations) {
		if (habitMap.has(habit_id)) {
			// will exist, but ?. makes typescript happy
			habitMap.get(habit_id)?.tag_ids.push(tag_id);
		}
	}

	for (const entry of entries) {
		if (habitMap.has(entry.habit_id)) {
			// will exist, but ?. makes typescript happy
			habitMap.get(entry.habit_id)?.entries.push(entry);
		}
	}

	return habitMap;
}
