import { sqlConnection } from "@/db/init";
import type { HabitEntry } from "@shared/types/data/habit.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryHabitEntriesByUser: QueryFunction<
	{ user_id: ID },
	Promise<HabitEntry[]>
> = ({ sql = sqlConnection, user_id }) => {
	return sql<HabitEntry[]>`select * from habit_entries where user_id = ${user_id}`;
};
