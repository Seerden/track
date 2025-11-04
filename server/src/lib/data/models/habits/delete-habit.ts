import type { Habit } from "@shared/lib/schemas/habit";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { sqlConnection } from "@/db/init";

export const deleteHabitById: QueryFunction<
	{ habit_id: ID; user_id: ID },
	Promise<{ habit_id: ID }[]>
> = async ({ sql = sqlConnection, habit_id, user_id }) => {
	return sql<Pick<Habit, "habit_id">[]>`
      delete from habits
         where habit_id = ${habit_id}
         and user_id = ${user_id}
      returning habit_id
   `;
};
