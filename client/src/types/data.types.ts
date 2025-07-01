import type {
	ActivityWithIds,
	Occurrence,
	Recurrence
} from "@shared/lib/schemas/activity";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@shared/lib/schemas/habit";
import type { NoteWithIds } from "@shared/lib/schemas/note";
import type { TagWithIds } from "@shared/lib/schemas/tag";
import type { User } from "@shared/lib/schemas/user";
import type { ID, Maybe } from "@shared/types/data/utility.types";
import type { Data, DataById } from "./query.types";

// TODO: all these types come from the backend, so they should be moved to the
// server folder, and also be used directly on the server.

export type UserData = Data<"user", Maybe<User>>;

export type TagsData = DataById<TagWithIds>;
export type ActivitiesData = DataById<ActivityWithIds>;
export type TagsTreeData = DataById<{ members: ID[] }>;
export type NotesData = DataById<NoteWithIds>;
export type HabitsData = DataById<HabitWithIds>;
export type HabitEntriesData = DataById<HabitEntry>;
export type OccurrencesData = DataById<Occurrence>;
export type RecurrencesData = DataById<Recurrence>;

// TODO TRK-228: can we remove all the above types once trpc is fully
// implemented?

export type HabitEntryUpdateMutationArgs = {
	input: HabitEntry | SyntheticHabitEntry;
	value?: string;
};

export type HabitEntryUpdateMutationFunction = (
	args: HabitEntryUpdateMutationArgs
) => void;
