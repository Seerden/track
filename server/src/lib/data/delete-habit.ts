import { sqlConnection } from "@/db/init";
import type { Habit } from "types/data/habit.types";
import type { WithSQL } from "types/sql.types";

export async function deleteHabitById({
	sql = sqlConnection,
	habit_id,
}: WithSQL<{ habit_id: Habit["habit_id"] }>) {
	return sql<[{ habit_id: Habit["habit_id"] }]>`
      delete from habits
      where habit_id = ${habit_id}
      returning habit_id
   `;
}
