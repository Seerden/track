import type { HabitEntry, HabitEntryInput } from "@shared/lib/schemas/habit";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

export const insertHabitEntry = query(
	async (
		sql,
		{ habitEntry, user_id }: { habitEntry: HabitEntryInput; user_id: ID }
	) => {
		const [insertedHabitEntry] = await sql<[HabitEntry]>`
         insert into habit_entries ${sql({ ...habitEntry, user_id })}
         returning *
      `;

		return insertedHabitEntry;
	}
);
