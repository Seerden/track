import { habitEntryInputSchema } from "@shared/lib/schemas/habit";
import { habitInputSchema } from "@shared/lib/schemas/habit.input";
import { insertHabitWithTags } from "@/lib/data/models/habits/insert-habit";
import { insertHabitEntry } from "@/lib/data/models/habits/insert-habit-entry";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const createHabitEntryMutation = betterAuthProcedure
	.input(habitEntryInputSchema)
	.mutation(async ({ input, ctx: { user } }) => {
		// TODO: call the input "input"
		return await insertHabitEntry({ habitEntry: input, user_id: user.id });
	});

export const createHabitMutation = betterAuthProcedure
	.input(habitInputSchema)
	.mutation(async ({ input: { habit, tagIds }, ctx: { user } }) => {
		return await insertHabitWithTags({ habit, tagIds, user_id: user.id });
	});
