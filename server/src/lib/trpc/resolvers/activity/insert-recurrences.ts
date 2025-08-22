import { insertOccurrence } from "@/lib/data/models/activities/insert-occurrence";
import { createRecurrence } from "@/lib/data/models/activities/insert-recurrence";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import {
	createRecurrenceInputSchema,
	newOccurrenceInputSchema,
} from "@shared/lib/schemas/activity";

export const createOccurrence = authenticatedProcedure
	.input(newOccurrenceInputSchema)
	.mutation(async ({ input, ctx: { req } }) => {
		insertOccurrence({ ...input, user_id: req.session.user.user_id });
	});

export const _createRecurrence = authenticatedProcedure
	.input(createRecurrenceInputSchema)
	.mutation(
		async ({ ctx: { req }, input: { activity_id, ...newRecurrence } }) => {
			createRecurrence({
				...newRecurrence,
				activity_id,
				user_id: req.session.user.user_id,
			});
		}
	);
