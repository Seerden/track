import { z } from "@shared/lib/zod";
import { deleteHabitById } from "@/lib/data/models/habits/delete-habit";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const deleteHabitByIdResolver = authenticatedProcedure
	.input(z.string())
	.mutation(async ({ input, ctx }) => {
		const user_id = ctx.req.session.user.user_id;
		return await deleteHabitById({ habit_id: input, user_id });
	});
