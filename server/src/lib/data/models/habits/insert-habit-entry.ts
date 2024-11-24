import { sqlConnection } from "@/db/init";
import type { HabitEntry, NewHabitEntry } from "@t/data/habit.types";
import type { QueryFunction } from "types/sql.types";

export const insertHabitEntry: QueryFunction<
	{ habitEntry: NewHabitEntry },
	Promise<HabitEntry>
> = async ({ sql = sqlConnection, habitEntry }) => {
	const [insertedHabitEntry] = await sql<[HabitEntry]>`
      insert into habit_entries ${sql(habitEntry)}
      returning *
   `;

	return insertedHabitEntry;
};
