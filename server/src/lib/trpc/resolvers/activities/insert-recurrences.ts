import {
	createRecurrenceInputSchema,
	newOccurrenceInputSchema,
} from "@shared/lib/schemas/activity";
import { createOccurrence } from "@/lib/data/models/activities/insert-occurrence";
import { createRecurrence } from "@/lib/data/models/activities/insert-recurrence";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const createOccurrenceMutation = betterAuthProcedure
	.input(newOccurrenceInputSchema)
	.mutation(async ({ input, ctx: { user } }) => {
		createOccurrence({ ...input, user_id: user.id });
	});

export const createRecurrenceMutation = betterAuthProcedure
	.input(createRecurrenceInputSchema)
	.mutation(
		async ({ ctx: { user }, input: { activity_id, ...newRecurrence } }) => {
			createRecurrence({
				...newRecurrence,
				activity_id,
				user_id: user.id,
			});
		}
	);
