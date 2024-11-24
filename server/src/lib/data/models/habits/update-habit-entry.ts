import { sqlConnection } from "@/db/init";
import type { HabitEntry, HabitEntryUpdateInput } from "@t/data/habit.types";
import type { QueryFunction } from "types/sql.types";

export const updateHabitEntry: QueryFunction<
	{ input: HabitEntryUpdateInput },
	Promise<HabitEntry[]>
> = async ({ sql = sqlConnection, input }) => {
	return sql<[HabitEntry]>`
      update habit_entries
      set ${sql(input)}
      where habit_entry_id = ${input.habit_entry_id}
      returning *
   `;
};
