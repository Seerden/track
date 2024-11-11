import type { ID, Nullable, Timestamp, Varchar } from "./utility.types";

/** These are the fields the user fills in. */
export type NewHabit = {
	user_id: ID;
	name: string;
	description: string;
	start_timestamp: Timestamp;
	end_timestamp: Nullable<Timestamp>;
	interval: number;
	frequency: number;
	interval_unit: string;
	type: Varchar;
	type_unit: Varchar;
};

/** Matches the shape of the `habits` table. */
export type Habit = NewHabit & {
	habit_id: ID;
	created_at: Timestamp;
};

/** Like other data types, a habit can also be linked to any number of tags. */
export type HabitWithIds = Habit & {
	tag_ids: ID[];
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

/** This is the what the client sends to /habit POST endpoint.
 * TODO: this has the same shape as e.g. ActivityInput. Should we generalize this?
 */
export type HabitInput = {
	habit: NewHabit;
	tag_ids?: ID[];
};

export type HabitEntryInput = {
	habitEntry: NewHabitEntry;
};
