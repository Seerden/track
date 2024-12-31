import { sqlConnection } from "@/db/init";
import type { HabitEntry, HabitEntryUpdateInput } from "@t/data/habit.types";
import type { QueryFunction } from "types/sql.types";

export const updateHabitEntry: QueryFunction<
	{ input: HabitEntryUpdateInput },
	Promise<HabitEntry[]>
> = async ({ sql = sqlConnection, input }) => {
	const { habit_entry_id, value } = input;

	return sql<[HabitEntry]>`
      update habit_entries
      set ${sql({ value })}
      where habit_entry_id = ${habit_entry_id}
      returning *
   `;
};
