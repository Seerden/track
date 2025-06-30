import { queryActivityByIdWithRelations } from "@/lib/data/models/activities/query-activities";
import {
	updateActivity as _updateActivity,
	updateActivityCompletion,
} from "@/lib/data/models/activities/update-activity";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { newActivitySchema } from "@/lib/trpc/resolvers/activity/insert-activities";
import { timestampSchema } from "@shared/types/schemas/timestamp";
import { z } from "zod";

export const taskUpdateSchema = z.object({
	completion_start: timestampSchema.optional(),
	completion_end: timestampSchema.optional(),
	completed: z.boolean().optional(),
});

export const activityBaseSchema = z.object({
	activity_id: z.string(),
	created_at: timestampSchema,
});

export const activitySchema = newActivitySchema
	.and(taskUpdateSchema)
	.and(activityBaseSchema);

export const activityWithIdsSchema = activitySchema.and(
	z.object({
		tag_ids: z.array(z.string()),
	}),
);

export const taskUpdateInputSchema = z.intersection(
	taskUpdateSchema,
	activityBaseSchema.pick({ activity_id: true }),
);

const activityUpdateInputSchema = z.object({
	activity: activityWithIdsSchema,
	tag_ids: z.array(z.string()),
});

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
