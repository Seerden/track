import {
	activityInputSchema,
	type NewActivity,
	newActivitySchema,
	recurringActivityInputSchema,
	syntheticActivitySchema,
} from "@shared/lib/schemas/activity";
import {
	createRecurringActivity as _createRecurringActivity,
	insertActivity,
	insertActivityWithTags,
} from "@/lib/data/models/activities/insert-activity";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

/** A synthetic activity, as of writing this, is an entry in a recurrence
 * relation that has been interacted with somehow. It does not have tags linked
 * to it, because we'll reuse the tags of the activity that the synthetic one stems
 * from. */
export const createRealSyntheticActivityMutation = betterAuthProcedure
	.input(syntheticActivitySchema)
	.mutation(async ({ input }) => {
		try {
			// TODO TRK-244: will_recur is set to false here by default, but this
			// might need to change when we start adding occurrences to the mix.
			const parsedSyntheticActivity = newActivitySchema.parse({
				...input,
				will_recur: false,
			});

			return await insertActivity({
				activity: parsedSyntheticActivity,
			});
		} catch (error) {
			// TODO: throw trpc error, since this is a resolver function
			console.error("Error creating synthetic activity:", error);
			throw error;
		}
	});

export const createActivityMutation = betterAuthProcedure
	.input(activityInputSchema)
	.mutation(async ({ input: { activity, tagIds }, ctx }) => {
		const activityWithUserId: NewActivity = {
			...activity,
			user_id: ctx.user.id,
		};

		return await insertActivityWithTags({
			activity: activityWithUserId,
			tag_ids: tagIds,
		});
	});

export const createRecurringActivityMutation = betterAuthProcedure
	.input(recurringActivityInputSchema)
	.mutation(async ({ input: { activity, tagIds, recurrence }, ctx }) => {
		const activityWithUserId: NewActivity = {
			...activity,
			user_id: ctx.user.id,
		};

		return await _createRecurringActivity({
			newActivity: activityWithUserId,
			tag_ids: tagIds,
			...recurrence,
		});
	});
