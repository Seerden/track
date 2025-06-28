import { sqlConnection } from "@/db/init";
import type { HabitEntry, NewHabitEntry } from "@shared/types/data/habit.types";
import type { QueryFunction } from "types/sql.types";

// TODO: remove this
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
