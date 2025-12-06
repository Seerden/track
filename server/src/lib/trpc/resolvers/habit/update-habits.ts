import { habitEntryUpdateInputSchema } from "@shared/lib/schemas/habit";
import { updateHabitEntry } from "@/lib/data/models/habits/update-habit-entry";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const updateEntry = betterAuthProcedure
	.input(habitEntryUpdateInputSchema)
	.mutation(async ({ input }) => {
		const [habitEntry] = await updateHabitEntry({ input });
		return habitEntry;
	});

export const updateHabit = betterAuthProcedure.mutation(async () => {
	// TODO: implement this functionality
});
