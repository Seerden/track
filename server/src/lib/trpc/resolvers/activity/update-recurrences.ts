import {
	occurrenceSchema,
	recurrenceWithIdsSchema,
} from "@shared/lib/schemas/activity";
import { updateOccurrence } from "@/lib/data/models/activities/update-occurrence";
import { updateRecurrence } from "@/lib/data/models/activities/update-recurrence";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const _updateOccurrence = betterAuthProcedure
	.input(occurrenceSchema)
	.mutation(async ({ input, ctx }) => {
		return await updateOccurrence({
			occurrence: input,
			user_id: ctx.user.id,
		});
	});

export const _updateRecurrence = betterAuthProcedure
	.input(recurrenceWithIdsSchema)
	.mutation(async ({ input, ctx }) => {
		return await updateRecurrence({
			...input,
			user_id: ctx.user.id,
		});
	});
