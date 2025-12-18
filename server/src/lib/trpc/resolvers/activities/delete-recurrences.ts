import { z } from "@shared/lib/zod";
import { deleteOccurrenceById } from "@/lib/data/models/activities/delete-occurrence";
import { deleteRecurrenceById } from "@/lib/data/models/activities/delete-recurrence";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const deleteRecurrenceByIdMutation = betterAuthProcedure
	.input(z.string())
	.mutation(async ({ input, ctx }) => {
		return await deleteRecurrenceById({
			recurrence_id: input,
			user_id: ctx.user.id,
		});
	});

export const deleteOccurrenceByIdMutation = betterAuthProcedure
	.input(z.string())
	.mutation(async ({ input, ctx }) => {
		return await deleteOccurrenceById({
			occurrence_id: input,
			user_id: ctx.user.id,
		});
	});
