import { habitEntryUpdateInputSchema } from "@shared/lib/schemas/habit";
import { updateHabitEntry } from "@/lib/data/models/habits/update-habit-entry";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const updateEntry = authenticatedProcedure
	.input(habitEntryUpdateInputSchema)
	.mutation(async ({ input }) => {
		const [habitEntry] = await updateHabitEntry({ input });
		return habitEntry;
	});

export const updateHabit = authenticatedProcedure.mutation(async () => {
	// TODO: implement this functionality
});
