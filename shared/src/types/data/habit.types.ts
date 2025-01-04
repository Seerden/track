import type {
	ID,
	IntervalUnit,
	Nullable,
	Timestamp,
	Varchar,
} from "./utility.types";

/** These are the fields the user fills in. */
export type NewHabit = {
	user_id: ID;
	name: string;
	description: string;
	start_timestamp: Timestamp;
	end_timestamp: Nullable<Timestamp>;
	interval: number;
	frequency: number;
	interval_unit: IntervalUnit;
	goal_type: "checkbox" | "goal";
	goal_unit: Nullable<Varchar>; // TODO: just a string
	goal: Nullable<number>;
};

/** Matches the shape of the `habits` table. */
export type Habit = NewHabit & {
	habit_id: ID;
	created_at: Timestamp;
};

/** Like other data types, a habit can also be linked to any number of tags.
 * Unlike other types, this also has entry_ids, which belong to habit_entries. */
export type HabitWithIds = Habit & {
	tag_ids: ID[];
	entry_ids: ID[];
};

/** These are the fields the user fills in. */
export type NewHabitEntry = {
	habit_id: ID;
	user_id: ID;
	date: Timestamp;
	index: number;
	value: Varchar;
};

/** Matches the shape of the `habit_entries` table. */
export type HabitEntry = NewHabitEntry & {
	habit_entry_id: ID;
	created_at: Timestamp;
};

/** This is a synthetic habit entry, which is not stored in the database, but is
 * an intermediate value used in the UI. */
export type SyntheticHabitEntry = Omit<
	HabitEntry,
	"user_id" | "value" | "habit_entry_id"
> & { synthetic: true };

/** Same as HabitWithIds, but the entries are now merged into the object. This
 * also still has entry_ids, which may be unnecessary since the whole entries
 * are in there, but it can't hurt to leave them around. */
export type HabitWithEntries = HabitWithIds & {
	entries: HabitEntry[];
};

export type HabitWithPossiblySyntheticEntries = HabitWithIds & {
	entries: Array<HabitEntry | SyntheticHabitEntry>;
};

/** This is the what the client sends to /habit POST endpoint.
 * TODO: this has the same shape as e.g. ActivityInput. Should we generalize this?
 */
export type HabitInput = {
	habit: NewHabit;
	tagIds?: ID[];
};

export type HabitEntryInput = {
	habitEntry: NewHabitEntry;
};

export type HabitEntryUpdate = {
	value: HabitEntry["value"];
};

export type HabitEntryUpdateInput = HabitEntryUpdate &
	Pick<HabitEntry, "habit_entry_id">;
