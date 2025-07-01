import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "zod";

// matches IntervalUnit
export const intervalUnitSchema = z.enum(["day", "week", "month", "year"]);

export const newHabitSchema = z.object({
	user_id: z.string(),
	name: z.string(),
	description: z.string(),
	start_timestamp: timestampSchema,
	end_timestamp: timestampSchema.nullable(),
	interval: z.number(),
	frequency: z.number(),
	interval_unit: intervalUnitSchema,
	goal_type: z.enum(["checkbox", "goal"]),
	goal_unit: z.string().nullable(),
	goal: z.number().nullable(),
});
export type NewHabit = z.infer<typeof newHabitSchema>;

export const habitSchema = newHabitSchema.and(
	z.object({
		habit_id: z.string(),
		created_at: timestampSchema,
	}),
);
export type Habit = z.infer<typeof habitSchema>;

/** Like other data types, a habit can also be linked to any number of tags.
 * Unlike other types, this also has entry_ids, which belong to habit_entries. */
export const habitWithIdsSchema = habitSchema.and(
	z.object({
		tag_ids: z.array(z.string()),
		entry_ids: z.array(z.string()),
	}),
);
export type HabitWithIds = z.infer<typeof habitWithIdsSchema>;

// matches HabitInput
export const habitInputSchema = z.object({
	habit: newHabitSchema,
	tagIds: z.array(z.string()).optional(),
});
export type HabitInput = z.infer<typeof habitInputSchema>;

// matches NewHabitEntry
export const habitEntryInputSchema = z.object({
	habit_id: z.string(),
	// TODO: take this out, get it from context
	user_id: z.string(),
	date: timestampSchema,
	index: z.number(),
	value: z.string(), // Varchar -- TODO: why not implement it as a number, and use values 0 and 1 for boolean habits?
});
// was NewHabitEntry
export type HabitEntryInput = z.infer<typeof habitEntryInputSchema>;

export const habitEntrySchema = habitEntryInputSchema.and(
	z.object({
		habit_entry_id: z.string(),
		created_at: timestampSchema,
	}),
);
export type HabitEntry = z.infer<typeof habitEntrySchema>;

export const habitEntryUpdateInputSchema = z.object({
	habit_entry_id: z.string(),
	value: z.string(), // TODO: type for Varchar
});
export type HabitEntryUpdateInput = z.infer<typeof habitEntryUpdateInputSchema>;

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
		}),
	);
export type SyntheticHabitEntry = z.infer<typeof syntheticHabitEntrySchema>;

/** Same as HabitWithIds, but the entries are now merged into the object. This
 * also still has entry_ids, which may be unnecessary since the whole entries
 * are in there, but it can't hurt to leave them around. */
export const habitWithEntriesSchema = habitWithIdsSchema.and(
	z.object({
		entries: z.array(habitEntrySchema),
	}),
);
export type HabitWithEntries = z.infer<typeof habitWithEntriesSchema>;

export const habitWithPossiblySyntheticEntriesSchema = habitWithIdsSchema.and(
	z.object({
		entries: z.array(habitEntrySchema.or(syntheticHabitEntrySchema)),
	}),
);
export type HabitWithPossiblySyntheticEntries = z.infer<
	typeof habitWithPossiblySyntheticEntriesSchema
>;
