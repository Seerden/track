import {
	createRecurringActivity as _createRecurringActivity,
	insertActivityWithTags,
} from "@/lib/data/models/activities/insert-activity";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { newRecurrenceSchema } from "@/lib/trpc/resolvers/activity/insert-recurrences";
import { timestampSchema } from "@shared/types/schemas/timestamp";
import { z } from "zod";

const newActivityBaseSchema = z.object({
	user_id: z.string(),
	name: z.string(),
	description: z.string(),
	duration_milliseconds: z.number().optional(),
	is_task: z.boolean().optional(),
});

const activityWithTimestampsSchema = newActivityBaseSchema.merge(
	z.object({
		started_at: timestampSchema,
		ended_at: timestampSchema,
		start_date: z.null(),
		end_date: z.null(),
	}),
);

const activityWithDatesSchema = newActivityBaseSchema.merge(
	z.object({
		started_at: z.null(),
		ended_at: z.null(),
		start_date: timestampSchema,
		end_date: timestampSchema,
	}),
);

const activityOccurrenceBaseSchema = z.union([
	z.object({
		occurrence: z.null(),
		recurrence_id: z.null(),
	}),
	z.object({
		occurrence: z.number(),
		recurrence_id: z.string(),
	}),
]);

// NewActivity
export const newActivitySchema = z.intersection(
	z.union([activityWithTimestampsSchema, activityWithDatesSchema]),
	activityOccurrenceBaseSchema,
);

export type NewActivity = z.infer<typeof newActivitySchema>;

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
