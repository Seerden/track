import type { HabitEntry, HabitEntryInput } from "@shared/lib/schemas/habit";
import { query } from "@/lib/query-function";

export const insertHabitEntry = query(
	async (sql, { habitEntry }: { habitEntry: HabitEntryInput }) => {
		const [insertedHabitEntry] = await sql<[HabitEntry]>`
         insert into habit_entries ${sql(habitEntry)}
         returning *
      `;

		return insertedHabitEntry;
	}
);
