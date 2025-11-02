import {
	activityUpdateInputSchema,
	taskUpdateInputSchema,
} from "@shared/lib/schemas/activity";
import { queryActivityByIdWithRelations } from "@/lib/data/models/activities/query-activities";
import {
	updateActivity as _updateActivity,
	updateActivityCompletion,
} from "@/lib/data/models/activities/update-activity";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const updateActivity = authenticatedProcedure
	.input(activityUpdateInputSchema)
	.mutation(async ({ input: { activity, tag_ids }, ctx }) => {
		const updatedActivity = await _updateActivity({
			input: { activity, tag_ids },
		});
		return await queryActivityByIdWithRelations({
			activity_id: updatedActivity.activity_id,
			// TODO: there is a ctx.user_id. Why? I think we want to get it from
			// ctx.req.session, always.
			user_id: ctx.req.session.user.user_id,
		});
	});

export const updateTaskCompletion = authenticatedProcedure
	.input(taskUpdateInputSchema)
	.mutation(async ({ input, ctx }) => {
		const [activity] = await updateActivityCompletion({ input });
		return await queryActivityByIdWithRelations({
			activity_id: activity.activity_id,
			user_id: ctx.req.session.user.user_id,
		});
	});
