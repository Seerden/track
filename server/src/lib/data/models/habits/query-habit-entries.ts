import { sqlConnection } from "@/db/init";
import type { HabitEntry } from "@t/data/habit.types";
import type { ID } from "@t/data/utility.types";
import type { WithSQL } from "types/sql.types";

export async function queryHabitEntriesByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<HabitEntry[]>`select * from habit_entries where user_id = ${user_id}`;
}
