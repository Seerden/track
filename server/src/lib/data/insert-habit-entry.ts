import { sqlConnection } from "@/db/init";
import type { RequestHandler } from "express";
import type { HabitEntry, HabitEntryInput, NewHabitEntry } from "types/data/habit.types";
import type { WithSQL } from "types/sql.types";

async function insertHabitEntry({
	sql = sqlConnection,
	habitEntry,
}: WithSQL<{ habitEntry: NewHabitEntry }>) {
	const [insertedHabitEntry] = await sql<[HabitEntry]>`
      insert into habit_entries ${sql(habitEntry)}
      returning *
   `;

	return insertedHabitEntry;
}

export const postHabitEntry: RequestHandler = async (req, res) => {
	const { habitEntry } = req.body as HabitEntryInput;
	const insertedHabitEntry = await insertHabitEntry({ habitEntry });
	res.json({ habitEntry: insertedHabitEntry });
};
