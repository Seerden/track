import { sqlConnection } from "@/db/init";
import { RequestHandler } from "express";
import { HabitEntry, HabitEntryInput, NewHabitEntry } from "types/data/habit.types";
import { WithSQL } from "types/sql.types";

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
