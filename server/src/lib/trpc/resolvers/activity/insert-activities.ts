import {
	createRecurringActivity as _createRecurringActivity,
	insertActivity,
	insertActivityWithTags,
} from "@/lib/data/models/activities/insert-activity";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import {
	activityInputSchema,
	newActivitySchema,
	recurringActivityInputSchema,
	syntheticActivitySchema,
} from "@shared/lib/schemas/activity";

/** A synthetic activity, as of writing this, is an entry in a recurrence
 * relation that has been interacted with somehow. It does not have tags linked
 * to it, because we'll reuse the tags of the activity that the synthetic one stems
 * from. */
export const createRealSyntheticActivity = authenticatedProcedure
	.input(syntheticActivitySchema)
	.mutation(async ({ input }) => {
		const parsedSyntheticActivity = newActivitySchema.safeParse(input);

		if (!parsedSyntheticActivity.success) {
			return console.error(parsedSyntheticActivity.error);
		}

		return await insertActivity({
			activity: parsedSyntheticActivity.data,
		});
	});

export const createActivity = authenticatedProcedure
	.input(activityInputSchema)
	.mutation(async ({ input: { activity, tagIds } }) => {
		return await insertActivityWithTags({ activity, tag_ids: tagIds });
	});

export const createRecurringActivity = authenticatedProcedure
	.input(recurringActivityInputSchema)
	.mutation(async ({ input: { activity, tagIds, recurrence } }) => {
		return await _createRecurringActivity({
			newActivity: activity,
			tag_ids: tagIds,
			...recurrence,
		});
	});
