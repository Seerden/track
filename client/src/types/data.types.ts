import type { ActivityWithIds } from "@t/data/activity.types";
import type { HabitEntry, HabitWithIds } from "@t/data/habit.types";
import type {
	Field,
	Item,
	ItemRow,
	ItemTemplate,
	Log,
	Logbook,
	LogTemplate
} from "@t/data/logbook.types";
import type { NoteWithIds } from "@t/data/note.types";
import type { TagWithIds } from "@t/data/tag.types";
import type { User } from "@t/data/user.types";
import type { Maybe } from "@t/data/utility.types";
import type { Data, DataById } from "./query.types";

// TODO: all these types come from the backend, so they should be moved to the
// server folder, and also be used directly on the server.

export type NotesData = DataById<NoteWithIds>;
export type HabitsData = DataById<HabitWithIds>;
export type HabitEntriesData = DataById<HabitEntry>;

export type UserData = Data<"user", Maybe<User>>;

export type FieldsData = DataById<Field>;

// usage transformed to Map
export type LogbooksData = DataById<Logbook>;
export type TagsData = DataById<TagWithIds>;
export type ActivitiesData = DataById<ActivityWithIds>;
export type TagsTreeData = DataById<{ members: number[] }>;
export type LogsData = DataById<Log>;
export type ItemsData = DataById<Item>;
export type ItemTemplatesData = DataById<ItemTemplate>;
export type LogTemplatesData = DataById<LogTemplate>;
export type ItemRowsData = DataById<ItemRow>;
