import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "@shared/lib/zod";

export const intervalUnitSchema = z.enum(["day", "week", "month", "year"]);

const habitBase = z.object({
	name: z.string(),
	description: z.string().nullable(),
	start_timestamp: timestampSchema,
	end_timestamp: timestampSchema.nullable(),
	interval: z.number(),
	frequency: z.number(),
	interval_unit: intervalUnitSchema,
});

/** A habit is either a checkbox habit, or a goal habit. This is indicated by
 * `goal_type`. */
const checkboxHabitBase = habitBase.extend({
	goal_type: z.literal("checkbox"),
	goal_unit: z.null(),
	goal: z.null(),
});
const goalHabitBase = habitBase.extend({
	goal_type: z.literal("goal"),
	goal_unit: z.string().nullable(),
	goal: z.number(),
});

export const newHabitSchema = z.discriminatedUnion("goal_type", [
	checkboxHabitBase,
	goalHabitBase,
]);

export const habitSchema = newHabitSchema.and(
	z.object({
		user_id: z.string(),
		habit_id: z.string(),
		created_at: timestampSchema,
	})
);

export const habitEntryInputSchema = z.object({
	habit_id: z.string(),
	date: timestampSchema,
	index: z.number(),
	value: z.string(), // Varchar -- TODO: why not implement it as a number, and use values 0 and 1 for boolean habits?
});

export const habitEntrySchema = habitEntryInputSchema.and(
	z.object({
		user_id: z.string(),
		habit_entry_id: z.string(),
		created_at: timestampSchema,
	})
);

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

/** This is a synthetic habit entry, which is not stored in the database, but is
 * an intermediate value used in the UI. */
const syntheticHabitEntrySchema = habitEntryInputSchema
	.omit({
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

const possiblySyntheticHabitEntrySchema = z.union([
	habitEntrySchema,
	syntheticHabitEntrySchema,
]);

const habitWithPossiblySyntheticEntriesSchema = habitWithIdsSchema.and(
	z.object({ entries: z.array(possiblySyntheticHabitEntrySchema) })
);

export type NewHabit = z.infer<typeof newHabitSchema>;
export type Habit = z.infer<typeof habitSchema>;
export type HabitEntryInput = z.infer<typeof habitEntryInputSchema>;
export type HabitEntry = z.infer<typeof habitEntrySchema>;
export type HabitWithEntries = z.infer<typeof habitWithEntriesSchema>;
export type SyntheticHabitEntry = z.infer<typeof syntheticHabitEntrySchema>;
export type PossiblySyntheticHabitEntry = z.infer<
	typeof possiblySyntheticHabitEntrySchema
>;
export type HabitWithPossiblySyntheticEntries = z.infer<
	typeof habitWithPossiblySyntheticEntriesSchema
>;
