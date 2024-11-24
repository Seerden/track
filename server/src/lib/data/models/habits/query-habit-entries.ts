import { sqlConnection } from "@/db/init";
import type { HabitEntry } from "@t/data/habit.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryHabitEntriesByUser: QueryFunction<
	{ user_id: ID },
	Promise<HabitEntry[]>
> = ({ sql = sqlConnection, user_id }) => {
	return sql<HabitEntry[]>`select * from habit_entries where user_id = ${user_id}`;
};
