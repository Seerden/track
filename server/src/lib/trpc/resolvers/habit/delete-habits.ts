import { z } from "@shared/lib/zod";
import { deleteHabitById as _deleteHabitById } from "@/lib/data/models/habits/delete-habit";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const deleteHabitById = authenticatedProcedure
	.input(z.string())
	.mutation(async ({ input }) => {
		return await _deleteHabitById({ habit_id: input });
	});
