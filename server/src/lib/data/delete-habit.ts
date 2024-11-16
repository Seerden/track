import { sqlConnection } from "@/db/init";
import type { RequestHandler } from "express";
import type { Habit } from "types/data/habit.types";
import type { WithSQL } from "types/sql.types";

export const deleteHabit: RequestHandler = async (req, res) => {
	const { habit_id } = req.params;
	const deletedHabitId = await deleteHabitById({ habit_id: +habit_id });
	res.json({ habit_id: deletedHabitId });
};

async function deleteHabitById({
	sql = sqlConnection,
	habit_id,
}: WithSQL<{ habit_id: Habit["habit_id"] }>) {
	return sql<[{ habit_id: Habit["habit_id"] }]>`
      delete from habits
      where habit_id = ${habit_id}
      returning habit_id
   `;
}
