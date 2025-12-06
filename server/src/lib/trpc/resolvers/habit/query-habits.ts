import { mapById } from "@shared/lib/map";
import { mergeHabitsAndRelations } from "@/lib/data/models/habits/merge-habits-and-relations";
import { queryHabitEntriesByUser } from "@/lib/data/models/habits/query-habit-entries";
import {
	queryHabitsByUser,
	queryHabitTagsByUser,
} from "@/lib/data/models/habits/query-habits";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

// NOTE (TRK-265) there is functionality (usage of `habitSuccessful<...>`) that
// requires this function to return _all_ entries, so keep that in mind if we
// ever change this function to return only a subset of entries.
export const queryHabitsAndRelations = betterAuthProcedure.query(
	async ({ ctx: { user } }) => {
		const user_id = user.id;

		const habits = await queryHabitsByUser({ user_id });
		const habitTagRelations = await queryHabitTagsByUser({ user_id });
		const entries = await queryHabitEntriesByUser({ user_id });

		return mergeHabitsAndRelations(habits, habitTagRelations, entries);
	}
);

export const queryHabitEntries = betterAuthProcedure.query(
	async ({ ctx: { user } }) => {
		const user_id = user.id;
		const entries = await queryHabitEntriesByUser({ user_id });
		return mapById(entries, "habit_entry_id");
	}
);
