import { updateHabitEntry } from "@/lib/data/models/habits/update-habit-entry";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { z } from "zod";

const habitEntryUpdateInputSchema = z.object({
	habit_entry_id: z.string(),
	value: z.string(), // TODO: type for Varchar
});

export const updateEntry = authenticatedProcedure
	.input(habitEntryUpdateInputSchema)
	.mutation(async ({ input }) => {
		const [habitEntry] = await updateHabitEntry({ input });
		return habitEntry;
	});

export const updateHabit = authenticatedProcedure.mutation(async () => {});
