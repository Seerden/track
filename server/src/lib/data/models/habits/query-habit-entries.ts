import type { HabitEntry } from "@shared/lib/schemas/habit";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";

export const queryHabitEntriesByUser: QueryFunction<
	{ user_id: ID },
	Promise<HabitEntry[]>
> = ({ sql = sqlConnection, user_id }) => {
	return sql<HabitEntry[]>`
      select * from ${sql(TABLES.HABIT_ENTRIES)} 
      where user_id = ${user_id}
   `;
};

export const queryHabitEntriesByHabit: QueryFunction<
	{ habit_entry_id: ID; user_id?: ID },
	Promise<HabitEntry[]>
> = async ({ sql = sqlConnection, habit_entry_id, user_id }) => {
	const userIdSql = user_id ? sql`and user_id = ${user_id}` : sql``;

	const entries = await sql<HabitEntry[]>`
      select * from ${sql(TABLES.HABIT_ENTRIES)}
      where habit_entry_id = ${habit_entry_id}
      ${userIdSql}
   `;

	return entries;
};
