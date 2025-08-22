import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "@shared/lib/zod";
import { queryActivitiesAndRelations } from "@/lib/data/models/activities/query-activities";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const queryActivities = authenticatedProcedure
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
			user_id: ctx.req.session.user.user_id,
			...input,
		});
		return activities;
	});

export const queryRecurringActivities = authenticatedProcedure.query(
	async ({ ctx }) => {
		return await queryActivitiesAndRelations({
			user_id: ctx.req.session.user.user_id,
			recurring: true,
		});
	}
);
