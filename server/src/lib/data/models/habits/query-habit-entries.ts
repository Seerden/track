import type { HabitEntry } from "@shared/lib/schemas/habit";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

export const queryHabitEntriesByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return sql<HabitEntry[]>`
         select * from ${sql(TABLES.HABIT_ENTRIES)} 
         where user_id = ${user_id}
      `;
	}
);

export const queryHabitEntriesByHabit = query(
	async (
		sql,
		{ habit_entry_id, user_id }: { habit_entry_id: ID; user_id?: ID }
	) => {
		const userIdSql = user_id ? sql`and user_id = ${user_id}` : sql``;

		const entries = await sql<HabitEntry[]>`
         select * from ${sql(TABLES.HABIT_ENTRIES)}
         where habit_entry_id = ${habit_entry_id}
         ${userIdSql}
      `;

		return entries;
	}
);
