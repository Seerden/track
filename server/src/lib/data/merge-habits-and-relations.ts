import { Habit, HabitEntry, HabitWithIds } from "types/data/habit.types";
import { HabitTagRelation } from "types/data/relational.types";
import { ById } from "types/data/utility.types";

export function mergeHabitsAndRelations(
	habits: Habit[],
	habitTagRelations: HabitTagRelation[],
	entries: HabitEntry[]
) {
	const byId = {} as ById<HabitWithIds>;
	for (const habit of habits) {
		byId[habit.habit_id] = Object.assign(habit, { tag_ids: [], entry_ids: [] });
	}

	for (const { habit_id, tag_id } of habitTagRelations) {
		byId[habit_id]?.tag_ids?.push(tag_id);
	}

	for (const entry of entries) {
		byId[entry.habit_id]?.entry_ids?.push(entry.habit_entry_id);
	}

	return byId;
}
