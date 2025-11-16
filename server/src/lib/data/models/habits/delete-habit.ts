import type { Habit } from "@shared/lib/schemas/habit";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

export const deleteHabitById = query(
	async (sql, { habit_id, user_id }: { habit_id: ID; user_id: ID }) => {
		return sql<Pick<Habit, "habit_id">[]>`
         delete from habits
            where habit_id = ${habit_id}
            and user_id = ${user_id}
         returning habit_id
      `;
	}
);
