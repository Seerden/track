import {
	createRecurringActivity as _createRecurringActivity,
	insertActivityWithTags,
} from "@/lib/data/models/activities/insert-activity";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { newRecurrenceSchema } from "@/lib/trpc/resolvers/activity/insert-recurrences";
import { newActivitySchema } from "@shared/types/data/activity.types";
import { z } from "zod";

// ActivityInput
export const activityInputSchema = z.object({
	activity: newActivitySchema,
	tagIds: z.array(z.string()).optional(),
});

export const createActivity = authenticatedProcedure
	.input(activityInputSchema)
	.mutation(async ({ input: { activity, tagIds } }) => {
		return await insertActivityWithTags({ activity, tag_ids: tagIds });
	});

export const newRecurrenceInputSchema = z.object({
	newRecurrence: newRecurrenceSchema,
});

const recurringActivityInputSchema = activityInputSchema.merge(newRecurrenceInputSchema);

export const createRecurringActivity = authenticatedProcedure
	.input(recurringActivityInputSchema)
	.mutation(async ({ input: { activity, newRecurrence, tagIds } }) => {
		return await _createRecurringActivity({
			newActivity: activity,
			tag_ids: tagIds,
			newRecurrence,
		});
	});
