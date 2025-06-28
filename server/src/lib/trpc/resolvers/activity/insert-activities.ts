import {
	createRecurringActivity as _createRecurringActivity,
	insertActivityWithTags,
} from "@/lib/data/models/activities/insert-activity";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { intervalUnitSchema } from "@/lib/trpc/resolvers/habit/insert-habits";
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
		started_at: z.string(), // TODO: Timestamp
		ended_at: z.string(), // TODO: Timestamp
		start_date: z.null(),
		end_date: z.null(),
	}),
);

const activityWithDatesSchema = newActivityBaseSchema.merge(
	z.object({
		started_at: z.null(),
		ended_at: z.null(),
		start_date: z.string(), // TODO: Datelike
		end_date: z.string(), // TODO: Datelike
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

export const newRecurrenceSchema = z.object({
	user_id: z.string(),
	interval: z.number(),
	interval_unit: intervalUnitSchema,
	frequency: z.number(),
	start_timestamp: z.string(), // TODO: Timestamp
	end_timestamp: z.string().nullable(), // TODO: Timestamp
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
