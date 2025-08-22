import type { Habit, HabitEntry } from "@shared/lib/schemas/habit";
import type { HabitTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { sqlConnection } from "@/db/init";

export const queryHabitEntriesByUser: QueryFunction<
	{ user_id: ID },
	Promise<HabitEntry[]>
> = ({ sql = sqlConnection, user_id }) => {
	return sql<
		HabitEntry[]
	>`select * from habit_entries where user_id = ${user_id}`;
};

export const queryHabitsByUser: QueryFunction<
	{ user_id: ID },
	Promise<Habit[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<Habit[]>`select * from habits where user_id = ${user_id}`;
};

export const queryHabitTagsByUser: QueryFunction<
	{ user_id: ID },
	Promise<HabitTagRelation[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<
		HabitTagRelation[]
	>`select * from habits_tags where user_id = ${user_id}`;
};
