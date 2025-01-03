import { sqlConnection } from "@/db/init";
import { mergeHabitsAndRelations } from "@/lib/data/models/habits/merge-habits-and-relations";
import { queryHabitEntriesByUser } from "@/lib/data/models/habits/query-habit-entries";
import type { Habit } from "@shared/types/data/habit.types";
import type { HabitTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

const queryHabitsByUser: QueryFunction<{ user_id: ID }, Promise<Habit[]>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	return sql<Habit[]>`select * from habits where user_id = ${user_id}`;
};

const queryHabitTagsByUser: QueryFunction<
	{ user_id: ID },
	Promise<HabitTagRelation[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<HabitTagRelation[]>`select * from habits_tags where user_id = ${user_id}`;
};

export async function queryHabitsAndRelations({ user_id }: { user_id: ID }) {
	const habits = await queryHabitsByUser({ user_id });
	const habitTagRelations = await queryHabitTagsByUser({ user_id });
	const entries = await queryHabitEntriesByUser({ user_id });

	return mergeHabitsAndRelations(habits, habitTagRelations, entries);
}
