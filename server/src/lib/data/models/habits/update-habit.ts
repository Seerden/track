import type { HabitUpdateInput } from "@shared/lib/schemas/habit.input";
import { query } from "@/lib/query-function";

export const updateHabit = query(
	async (sql, { input }: { input: HabitUpdateInput }) => {
		return;
	}
);
