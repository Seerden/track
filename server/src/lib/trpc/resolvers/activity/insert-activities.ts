import {
	createRecurringActivity as _createRecurringActivity,
	insertActivityWithTags,
} from "@/lib/data/models/activities/insert-activity";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import {
	activityInputSchema,
	recurringActivityInputSchema,
} from "@shared/lib/schemas/activity";

export const createActivity = authenticatedProcedure
	.input(activityInputSchema)
	.mutation(async ({ input: { activity, tagIds } }) => {
		return await insertActivityWithTags({ activity, tag_ids: tagIds });
	});

export const createRecurringActivity = authenticatedProcedure
	.input(recurringActivityInputSchema)
	.mutation(async ({ input: { activity, tagIds, newRecurrence } }) => {
		return await _createRecurringActivity({
			newActivity: activity,
			tag_ids: tagIds,
			...newRecurrence,
		});
	});
