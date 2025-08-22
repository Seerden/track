import type { HabitEntry, HabitEntryInput } from "@shared/lib/schemas/habit";
import type { QueryFunction } from "types/sql.types";
import { sqlConnection } from "@/db/init";

export const insertHabitEntry: QueryFunction<
	{ habitEntry: HabitEntryInput },
	Promise<HabitEntry>
> = async ({ sql = sqlConnection, habitEntry }) => {
	const [insertedHabitEntry] = await sql<[HabitEntry]>`
      insert into habit_entries ${sql(habitEntry)}
      returning *
   `;

	return insertedHabitEntry;
};
