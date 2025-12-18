import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "@shared/lib/zod";
import { queryActivitiesAndRelations } from "@/lib/data/models/activities/query-activities";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const activitiesQuery = betterAuthProcedure
	.input(
		z
			.object({
				from: timestampSchema.optional(),
				to: timestampSchema.optional(),
			})
			.optional()
	)
	.query(async ({ ctx, input }) => {
		const activities = await queryActivitiesAndRelations({
			user_id: ctx.user.id,
			...input,
		});
		return activities;
	});

export const recurringActivitiesQuery = betterAuthProcedure.query(
	async ({ ctx }) => {
		return await queryActivitiesAndRelations({
			user_id: ctx.user.id,
			recurring: true,
		});
	}
);
