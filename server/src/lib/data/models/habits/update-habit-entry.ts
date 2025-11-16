import type {
	HabitEntry,
	HabitEntryUpdateInput,
} from "@shared/lib/schemas/habit";
import { query } from "@/lib/query-function";

export const updateHabitEntry = query(
	async (sql, { input }: { input: HabitEntryUpdateInput }) => {
		const { habit_entry_id, value } = input;

		return sql<[HabitEntry]>`
         update habit_entries
         set ${sql({ value })}
         where habit_entry_id = ${habit_entry_id}
         returning *
      `;
	}
);
