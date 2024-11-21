import { sqlConnection } from "@/db/init";
import type { HabitEntry, HabitEntryUpdateInput } from "@t/data/habit.types";
import type { WithSQL } from "types/sql.types";

export async function updateHabitEntry({
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
