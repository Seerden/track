import { insertHabitWithTags } from "@/lib/data/models/habits/insert-habit";
import { insertHabitEntry } from "@/lib/data/models/habits/insert-habit-entry";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import {
	habitEntryInputSchema,
	habitInputSchema,
} from "@shared/lib/schemas/habit";

export const createHabitEntry = authenticatedProcedure
	.input(habitEntryInputSchema)
	.mutation(async ({ input }) => {
		// TODO: call the input "input"
		return await insertHabitEntry({ habitEntry: input });
	});

export const createHabit = authenticatedProcedure
	.input(habitInputSchema)
	.mutation(async ({ input: { habit, tagIds } }) => {
		const habitWithTags = await insertHabitWithTags({ habit, tagIds });
	});
