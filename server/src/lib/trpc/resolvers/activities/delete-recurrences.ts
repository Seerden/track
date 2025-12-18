import { z } from "@shared/lib/zod";
import { removeOccurrenceById } from "@/lib/data/models/activities/remove-occurrence";
import { removeRecurrenceById } from "@/lib/data/models/activities/remove-recurrence";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const deleteRecurrenceByIdMutation = betterAuthProcedure
	.input(z.string())
	.mutation(async ({ input, ctx }) => {
		return await removeRecurrenceById({
			recurrence_id: input,
			user_id: ctx.user.id,
		});
	});

export const deleteOccurrenceByIdMutation = betterAuthProcedure
	.input(z.string())
	.mutation(async ({ input, ctx }) => {
		return await removeOccurrenceById({
			occurrence_id: input,
			user_id: ctx.user.id,
		});
	});
