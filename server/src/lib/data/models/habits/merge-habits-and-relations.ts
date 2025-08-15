import type { Habit, HabitEntry, HabitWithIds } from "@shared/lib/schemas/habit";
import type { HabitTagRelation } from "@shared/types/data/relational.types";

export function mergeHabitsAndRelations(
	habits: Habit[],
	habitTagRelations: HabitTagRelation[],
	entries: HabitEntry[],
) {
	const habitMap = new Map<Habit["habit_id"], HabitWithIds>();
	for (const habit of habits) {
		habitMap.set(habit.habit_id, {
			...habit,
			tag_ids: [],
			entry_ids: [],
		});
	}

	for (const { habit_id, tag_id } of habitTagRelations) {
		if (habitMap.has(habit_id)) {
			habitMap.get(habit_id)!.tag_ids.push(tag_id);
		}
	}

	// TODO TRK-76: we have the entire entries list here, so why not set
	// habit.entries instead of habit.entry_ids?
	for (const entry of entries) {
		if (habitMap.has(entry.habit_id)) {
			habitMap.get(entry.habit_id)!.entry_ids.push(entry.habit_entry_id);
		}
	}

	return habitMap;
}
