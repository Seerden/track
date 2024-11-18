import { sqlConnection } from "@/db/init";
import type { HabitEntry, NewHabitEntry } from "@t/data//habit.types";
import type { WithSQL } from "types/sql.types";

export async function insertHabitEntry({
	sql = sqlConnection,
	habitEntry,
}: WithSQL<{ habitEntry: NewHabitEntry }>) {
	const [insertedHabitEntry] = await sql<[HabitEntry]>`
      insert into habit_entries ${sql(habitEntry)}
      returning *
   `;

	return insertedHabitEntry;
}
