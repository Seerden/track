import { sqlConnection } from "@/db/init";
import { RequestHandler } from "express";
import { HabitEntry, HabitEntryUpdateInput } from "types/data/habit.types";
import { WithSQL } from "types/sql.types";

// TODO: rename this file to put-habit-entry
export const putHabitEntry: RequestHandler = async (req, res) => {
	const { input } = req.body as { input: HabitEntryUpdateInput };
	const [habitEntry] = await updateHabitEntry({ input });

	res.json({ habitEntry });
};

async function updateHabitEntry({
	sql = sqlConnection,
	input,
}: WithSQL<{ input: HabitEntryUpdateInput }>) {
	return sql<[HabitEntry]>`
      update habit_entries
      set ${sql(input)}
      where habit_entry_id = ${input.habit_entry_id}
      returning *
   `;
}
