import {
	occurrenceSchema,
	recurrenceWithIdsSchema,
} from "@shared/lib/schemas/activity";
import { updateOccurrence } from "@/lib/data/models/activities/update-occurrence";
import { updateRecurrence } from "@/lib/data/models/activities/update-recurrence";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const _updateOccurrence = authenticatedProcedure
	.input(occurrenceSchema)
	.mutation(async ({ input, ctx }) => {
		return await updateOccurrence({
			occurrence: input,
			user_id: ctx.req.session.user.user_id,
		});
	});

export const _updateRecurrence = authenticatedProcedure
	.input(recurrenceWithIdsSchema)
	.mutation(async ({ input, ctx }) => {
		return await updateRecurrence({
			...input,
			user_id: ctx.req.session.user.user_id,
		});
	});
