import { z } from "@shared/lib/zod";
import { removeOccurrenceById } from "@/lib/data/models/activities/remove-occurrence";
import { removeRecurrenceById } from "@/lib/data/models/activities/remove-recurrence";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const deleteRecurrenceById = authenticatedProcedure
	.input(z.string())
	.mutation(async ({ input, ctx }) => {
		return await removeRecurrenceById({
			recurrence_id: input,
			user_id: ctx.req.session.user.user_id,
		});
	});

export const deleteOccurrenceById = authenticatedProcedure
	.input(z.string())
	.mutation(async ({ input, ctx }) => {
		return await removeOccurrenceById({
			occurrence_id: input,
			user_id: ctx.req.session.user.user_id,
		});
	});
