import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "@shared/lib/zod";

const intervalUnit = z.enum(["day", "week", "month", "year"]);

/** partial schema for `newHabit`. Both types of habits (checkbox, goal) extend
 * this, then they are extended to become `newHabit`. */
const habitBase = z.object({
	name: z.string(),
	description: z.string().nullable(),
	start_timestamp: timestampSchema,
	end_timestamp: timestampSchema.nullable(),
	interval: z.number(),
	frequency: z.number(),
	interval_unit: intervalUnit,
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

const newHabit = z.discriminatedUnion("goal_type", [
	checkboxHabitBase,
	goalHabitBase,
]);

const habit = newHabit.and(
	z.object({
		user_id: z.string(),
		habit_id: z.string(),
		created_at: timestampSchema,
	})
);

const habitEntryInput = z.object({
	habit_id: z.string(),
	date: timestampSchema,
	index: z.number(),
	/** This is a varchar in the database.
	 * @todo: why not implement it as a number, and use values 0 and 1 for
	 * boolean habits? */
	value: z.string(),
});

const habitEntry = habitEntryInput.and(
	z.object({
		user_id: z.string(),
		habit_entry_id: z.string(),
		created_at: timestampSchema,
	})
);

const habitWithIds = habit.and(
	z.object({
		tag_ids: z.array(z.string()),
	})
);

/** Like other data types, a habit can also be linked to any number of tags.
 * For this one, the server just gets the entire entries, instead of only the
 * ids (hence it's called habitWithEntries vs. habitWithIds). */
const habitWithEntries = habitWithIds.and(
	z.object({
		entries: z.array(habitEntry),
	})
);

/** This is a synthetic habit entry, which is not stored in the database, but is
 * an intermediate value used in the UI. */
const syntheticHabitEntry = habitEntryInput
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

const possiblySyntheticHabitEntry = z.union([habitEntry, syntheticHabitEntry]);

const habitWithPossiblySyntheticEntries = habitWithIds.and(
	z.object({ entries: z.array(possiblySyntheticHabitEntry) })
);

/** For readability, in this file these are defined without the `Schema` suffix,
 * but I prefer the suffix where they're actually used, so I know that they're
 * `zod` schemas. */
export {
	intervalUnit as intervalUnitSchema,
	newHabit as newHabitSchema,
	habit as habitSchema,
	habitEntryInput as habitEntryInputSchema,
	habitEntry as habitEntrySchema,
	habitWithIds as habitWithIdsSchema,
	habitWithEntries as habitWithEntriesSchema,
};

export type NewHabit = z.infer<typeof newHabit>;
export type Habit = z.infer<typeof habit>;
export type HabitEntryInput = z.infer<typeof habitEntryInput>;
export type HabitEntry = z.infer<typeof habitEntry>;
export type HabitWithEntries = z.infer<typeof habitWithEntries>;
export type SyntheticHabitEntry = z.infer<typeof syntheticHabitEntry>;
export type PossiblySyntheticHabitEntry = z.infer<
	typeof possiblySyntheticHabitEntry
>;
export type HabitWithPossiblySyntheticEntries = z.infer<
	typeof habitWithPossiblySyntheticEntries
>;
