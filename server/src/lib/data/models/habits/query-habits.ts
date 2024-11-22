import { sqlConnection } from "@/db/init";
import { mergeHabitsAndRelations } from "@/lib/data/models/habits/merge-habits-and-relations";
import { queryHabitEntriesByUser } from "@/lib/data/models/habits/query-habit-entries";
import type { Habit } from "@t/data/habit.types";
import type { HabitTagRelation } from "@t/data/relational.types";
import type { ID } from "@t/data/utility.types";
import type { WithSQL } from "types/sql.types";

async function queryHabitsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<Habit[]>`select * from habits where user_id = ${user_id}`;
}

async function queryHabitTagsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<HabitTagRelation[]>`select * from habits_tags where user_id = ${user_id}`;
}

export async function queryHabitsAndRelations({ user_id }: { user_id: ID }) {
	const habits = await queryHabitsByUser({ user_id });
	const habitTagRelations = await queryHabitTagsByUser({ user_id });
	const entries = await queryHabitEntriesByUser({ user_id });

	return mergeHabitsAndRelations(habits, habitTagRelations, entries);
}
