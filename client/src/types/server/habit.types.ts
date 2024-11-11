import type { ID, Timestamp } from "@/types/server/utility.types";

type Nullable<T> = T | null;
type Varchar = string; // TODO: make sure we parse this correctly

/** These are the fields the user fills in. */
type NewHabit = {
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
type Habit = NewHabit & {
	habit_id: ID;
	created_at: Timestamp;
};

/** Like other data types, a habit can also be linked to any number of tags. */
type HabitWithIds = Habit & {
	tag_ids: ID[];
};

/** These are the fields the user fills in. */
type NewHabitEntry = {
	habit_id: ID;
	user_id: ID;
	date: Timestamp;
	index: number;
	value: Varchar;
};

/** Matches the shape of the `habit_entries` table. */
type HabitEntry = NewHabitEntry & {
	habit_entry_id: ID;
	created_at: Timestamp;
};

/** This is the what the client sends to /habit POST endpoint.
 * TODO: this has the same shape as e.g. ActivityInput. Should we generalize this?
 */
type HabitInput = {
	habit: NewHabit;
	tagIds?: ID[];
};
