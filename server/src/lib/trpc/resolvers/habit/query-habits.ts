import { mapById } from "@shared/lib/map";
import { mergeHabitsAndRelations } from "@/lib/data/models/habits/merge-habits-and-relations";
import {
	queryHabitEntriesByUser,
	queryHabitsByUser,
	queryHabitTagsByUser,
} from "@/lib/data/models/habits/query-habit-entries";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const queryHabitsAndRelations = authenticatedProcedure.query(
	async ({ ctx: { req } }) => {
		const user_id = req.session.user.user_id;

		const habits = await queryHabitsByUser({ user_id });
		const habitTagRelations = await queryHabitTagsByUser({ user_id });
		const entries = await queryHabitEntriesByUser({ user_id });

		return mergeHabitsAndRelations(habits, habitTagRelations, entries);
	}
);

export const queryHabitEntries = authenticatedProcedure.query(
	async ({ ctx: { req } }) => {
		const user_id = req.session.user.user_id;
		const entries = await queryHabitEntriesByUser({ user_id });
		return mapById(entries, "habit_entry_id");
	}
);
