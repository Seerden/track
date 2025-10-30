import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "@shared/lib/zod";

export const intervalUnitSchema = z.enum(["day", "week", "month", "year"]);

const goalSchema = z.discriminatedUnion("goal_type", [
	z.object({
		goal_type: z.literal("checkbox"),
		goal_unit: z.null(),
		goal: z.null(),
	}),
	z.object({
		goal_type: z.literal("goal"),
		goal_unit: z.string().nullable(),
		goal: z.number(),
	}),
]);

export const newHabitSchema = z
	.object({
		user_id: z.string(),
		name: z.string(),
		description: z.string().nullable(),
		start_timestamp: timestampSchema,
		end_timestamp: timestampSchema.nullable(),
		interval: z.number(),
		frequency: z.number(),
		interval_unit: intervalUnitSchema,
	})
	.and(goalSchema);
export type NewHabit = z.infer<typeof newHabitSchema>;

export const habitSchema = newHabitSchema.and(
	z.object({
		habit_id: z.string(),
		created_at: timestampSchema,
	})
);
export type Habit = z.infer<typeof habitSchema>;

export const habitEntryInputSchema = z.object({
	habit_id: z.string(),
	// TODO: take this out, get it from context
	user_id: z.string(),
	date: timestampSchema,
	index: z.number(),
	value: z.string(), // Varchar -- TODO: why not implement it as a number, and use values 0 and 1 for boolean habits?
});
export type HabitEntryInput = z.infer<typeof habitEntryInputSchema>;

export const habitEntrySchema = habitEntryInputSchema.and(
	z.object({
		habit_entry_id: z.string(),
		created_at: timestampSchema,
	})
);
export type HabitEntry = z.infer<typeof habitEntrySchema>;

export const habitEntryUpdateInputSchema = z.object({
	habit_entry_id: z.string(),
	value: z.string(), // TODO: type for Varchar
});
export type HabitEntryUpdateInput = z.infer<typeof habitEntryUpdateInputSchema>;

export const habitWithIdsSchema = habitSchema.and(
	z.object({
		tag_ids: z.array(z.string()),
	})
);
/** Like other data types, a habit can also be linked to any number of tags.
 * For this one, the server just gets the entire entries, instead of only the
 * ids (hence it's called habitWithEntries vs. habitWithIds). */
export const habitWithEntriesSchema = habitWithIdsSchema.and(
	z.object({
		entries: z.array(habitEntrySchema),
	})
);
export type HabitWithEntries = z.infer<typeof habitWithEntriesSchema>;

export const habitInputSchema = z.object({
	habit: newHabitSchema,
	tagIds: z.array(z.string()).optional(),
});
export type HabitInput = z.infer<typeof habitInputSchema>;

/** This is a synthetic habit entry, which is not stored in the database, but is
 * an intermediate value used in the UI. */
export const syntheticHabitEntrySchema = habitEntryInputSchema
	.omit({
		user_id: true,
		value: true,
	})
	.and(
		z.object({
			synthetic: z.literal(true),
			// @note ideally I'd define this syntheticHabitEntrySchema as an
			// extension of habitEntrySchema, but it's tough to do that with a zod
			// intersection, so instead I have to just redefine this field.
			created_at: timestampSchema,
		})
	);
export type SyntheticHabitEntry = z.infer<typeof syntheticHabitEntrySchema>;

export const possiblySyntheticHabitEntrySchema = z.union([
	habitEntrySchema,
	syntheticHabitEntrySchema,
]);
export type PossiblySyntheticHabitEntry = z.infer<
	typeof possiblySyntheticHabitEntrySchema
>;

export const habitWithPossiblySyntheticEntriesSchema = habitWithIdsSchema.and(
	z.object({
		entries: z.union([
			habitEntrySchema.array(),
			possiblySyntheticHabitEntrySchema.array(),
		]),
	})
);
export type HabitWithPossiblySyntheticEntries = z.infer<
	typeof habitWithPossiblySyntheticEntriesSchema
>;
