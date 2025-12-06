import { z } from "@shared/lib/zod";
import { deleteHabitById } from "@/lib/data/models/habits/delete-habit";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const deleteHabitByIdResolver = betterAuthProcedure
	.input(z.string())
	.mutation(async ({ input, ctx }) => {
		const user_id = ctx.user.id;
		return await deleteHabitById({ habit_id: input, user_id });
	});
