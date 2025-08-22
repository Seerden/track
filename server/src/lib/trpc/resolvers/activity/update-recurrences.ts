import { updateOccurrence } from "@/lib/data/models/activities/update-occurrence";
import { updateRecurrence } from "@/lib/data/models/activities/update-recurrence";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import {
	occurrenceSchema,
	recurrenceSchema,
} from "@shared/lib/schemas/activity";

export const _updateOccurrence = authenticatedProcedure
	.input(occurrenceSchema)
	.mutation(async ({ input, ctx }) => {
		return await updateOccurrence({
			occurrence: input,
			user_id: ctx.req.session.user.user_id,
		});
	});

export const _updateRecurrence = authenticatedProcedure
	.input(recurrenceSchema)
	.mutation(async ({ input, ctx }) => {
		return await updateRecurrence({
			recurrence: input,
			user_id: ctx.req.session.user.user_id,
		});
	});
