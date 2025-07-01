import { sqlConnection } from "@/db/init";
import type { Habit } from "@shared/lib/schemas/habit";
import type { ID } from "@shared/types/data/utility.types";
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
