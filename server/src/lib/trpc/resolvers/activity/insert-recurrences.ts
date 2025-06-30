import { insertOccurrence } from "@/lib/data/models/activities/insert-occurrence";
import { createRecurrence } from "@/lib/data/models/activities/insert-recurrence";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { intervalUnitSchema } from "@/lib/trpc/resolvers/habit/insert-habits";
import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "zod";

export const newRecurrenceInputSchema = z.object({
	interval: z.number(),
	interval_unit: intervalUnitSchema,
	frequency: z.number(),
	start_timestamp: timestampSchema,
	end_timestamp: timestampSchema.nullable(),
});

export const createRecurrenceInputSchema = newRecurrenceInputSchema.and(
	z.object({
		/** from ActivityWithIds["activity_id"] */
		activity_id: z.string(),
	}),
);

export const newRecurrenceSchema = newRecurrenceInputSchema.and(
	z.object({
		user_id: z.string(),
	}),
);

export const recurrenceSchema = newRecurrenceSchema.and(
	z.object({
		recurrence_id: z.string(),
		created_at: timestampSchema,
	}),
);

export const occurrenceDivergenceBaseSchema = z.discriminatedUnion("divergence_kind", [
	z.object({
		divergence_kind: z.literal("offset"),
		offset_milliseconds: z.string(), // TODO: bigint
	}),
	z.object({
		divergence_kind: z.literal("skip"),
		offset_milliseconds: z.null(),
	}),
]);

export const newOccurrenceInputSchema = occurrenceDivergenceBaseSchema.and(
	z.object({
		recurrence_id: z.string(),
		activity_id: z.string(),
		divergence_count: z.number(),
		excluded_activity_ids: z.array(z.string()),
	}),
);

export const newOccurrenceSchema = newOccurrenceInputSchema.and(
	z.object({
		user_id: z.string(),
	}),
);

export const occurrenceSchema = newOccurrenceSchema.and(
	z.object({
		occurrence_id: z.string(),
	}),
);

export const createOccurrence = authenticatedProcedure
	.input(newOccurrenceInputSchema)
	.mutation(async ({ input, ctx: { req } }) => {
		insertOccurrence({ newOccurrence: input, user_id: req.session.user.user_id });
	});

export const _createRecurrence = authenticatedProcedure
	.input(createRecurrenceInputSchema)
	.mutation(async ({ ctx: { req }, input: { activity_id, ...newRecurrence } }) => {
		createRecurrence({ newRecurrence, activity_id, user_id: req.session.user.user_id });
	});
