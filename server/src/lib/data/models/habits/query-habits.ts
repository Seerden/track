import type { Habit } from "@shared/lib/schemas/habit";
import type { HabitTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

/** Check (by id) if a user owns a habit.
 * @todo we could cache this, but we don't even cache habits yet, so let's start
 * with that. Update mutations don't occur that often, so small performance wins
 * on them aren't that important at this stage.
 * @note may be replaced by other functionality TRK-298. */
export const userOwnsHabit = query(
	async (sql, { user_id, habit_id }: { user_id: ID; habit_id: ID }) => {
		const [response] = await sql<{ count: string }[]>`
         select count(habit_id) as count from ${sql(TABLES.HABITS)}
         where user_id = ${user_id} 
            and habit_id = ${habit_id}
      `;

		// not to be mistaken with RowList.count
		return response.count === "1";
	}
);

/** Get the ids of all of a user's habits.. */
export const listHabitsByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return await sql<Pick<Habit, "habit_id">[]>`
         select habit_id from ${sql(TABLES.HABITS)}
         where user_id = ${user_id}
      `;
	}
);

export const queryHabitsByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return sql<Habit[]>`
         select * from ${sql(TABLES.HABITS)} 
         where user_id = ${user_id}
      `;
	}
);

/** Query tags by habit id. */
export const queryHabitTags = query(
	async (sql, { habit_id, user_id }: { habit_id: ID; user_id: ID }) => {
		return sql<HabitTagRelation[]>`
         select * from ${sql(TABLES.HABITS_TAGS)} 
         where habit_id = ${habit_id}
         and user_id = ${user_id}
      `;
	}
);

export const queryHabitTagsByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return sql<HabitTagRelation[]>`
         select * from ${sql(TABLES.HABITS_TAGS)} 
         where user_id = ${user_id}
      `;
	}
);
