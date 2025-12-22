import { habitWithIdsSchema } from "@shared/lib/schemas/habit";
import {
	habitEntryUpdateInputSchema,
	habitUpdateInputSchema,
} from "@shared/lib/schemas/habit.input";
import { updateHabit } from "@/lib/data/models/habits/update-habit";
import { updateHabitEntry } from "@/lib/data/models/habits/update-habit-entry";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const updateEntryMutation = betterAuthProcedure
	.input(habitEntryUpdateInputSchema)
	.mutation(async ({ input }) => {
		const [habitEntry] = await updateHabitEntry({ input });
		return habitEntry;
	});

export const updateHabitMutation = betterAuthProcedure
	.input(habitUpdateInputSchema)
	.output(habitWithIdsSchema.optional())
	.mutation(async ({ input, ctx: { user } }) => {
		return await updateHabit({ input, user_id: user.id });
	});
