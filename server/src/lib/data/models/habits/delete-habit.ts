import { sqlConnection } from "@/db/init";
import type { Habit } from "@t/data/habit.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const deleteHabitById: QueryFunction<
	{ habit_id: ID },
	Promise<{ habit_id: ID }[]>
> = async ({ sql = sqlConnection, habit_id }) => {
	return sql<[{ habit_id: Habit["habit_id"] }]>`
      delete from habits
      where habit_id = ${habit_id}
      returning habit_id
   `;
};
