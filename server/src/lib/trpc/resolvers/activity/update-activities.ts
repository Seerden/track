import { queryActivityByIdWithRelations } from "@/lib/data/models/activities/query-activities";
import {
	updateActivity as _updateActivity,
	updateActivityCompletion,
} from "@/lib/data/models/activities/update-activity";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import {
	activityUpdateInputSchema,
	taskUpdateInputSchema,
} from "@shared/types/data/activity.types";

// trpc done
export const updateActivity = authenticatedProcedure
	.input(activityUpdateInputSchema)
	.mutation(async ({ input: { activity, tag_ids } }) => {
		const updatedActivity = await _updateActivity({
			input: { activity, tag_ids },
		});
		return await queryActivityByIdWithRelations({
			activity_id: updatedActivity.activity_id,
		});
	});

// trpc done
export const updateTaskCompletion = authenticatedProcedure
	.input(taskUpdateInputSchema)
	.mutation(async ({ input }) => {
		const [activity] = await updateActivityCompletion({ input });
		return await queryActivityByIdWithRelations({
			activity_id: activity.activity_id,
		});
	});
