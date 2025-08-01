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
	type NewActivity,
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
			// TODO: throw trpc error, since this is a resolver function
			return console.error(parsedSyntheticActivity.error);
		}

		return await insertActivity({
			activity: parsedSyntheticActivity.data,
		});
	});

export const createActivity = authenticatedProcedure
	.input(activityInputSchema)
	.mutation(async ({ input: { activity, tagIds }, ctx }) => {
		const activityWithUserId: NewActivity = {
			...activity,
			user_id: ctx.req.session.user.user_id,
		};

		return await insertActivityWithTags({
			activity: activityWithUserId,
			tag_ids: tagIds,
		});
	});

export const createRecurringActivity = authenticatedProcedure
	.input(recurringActivityInputSchema)
	.mutation(async ({ input: { activity, tagIds, recurrence }, ctx }) => {
		const activityWithUserId: NewActivity = {
			...activity,
			user_id: ctx.req.session.user.user_id,
		};

		return await _createRecurringActivity({
			newActivity: activityWithUserId,
			tag_ids: tagIds,
			...recurrence,
		});
	});
