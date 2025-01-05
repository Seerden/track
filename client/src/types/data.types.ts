import type { ActivityWithIds } from "@shared/types/data/activity.types";
import type { HabitEntry, HabitWithIds } from "@shared/types/data/habit.types";
import type {
	Field,
	Item,
	ItemRow,
	ItemTemplate,
	Log,
	Logbook,
	LogTemplate
} from "@shared/types/data/logbook.types";
import type { NoteWithIds } from "@shared/types/data/note.types";
import type { Occurrence, Recurrence } from "@shared/types/data/recurrence.types";
import type { TagWithIds } from "@shared/types/data/tag.types";
import type { User } from "@shared/types/data/user.types";
import type { Maybe } from "@shared/types/data/utility.types";
import type { Data, DataById } from "./query.types";

// TODO: all these types come from the backend, so they should be moved to the
// server folder, and also be used directly on the server.

export type UserData = Data<"user", Maybe<User>>;

export type LogbooksData = DataById<Logbook>;
export type TagsData = DataById<TagWithIds>;
export type ActivitiesData = DataById<ActivityWithIds>;
export type TagsTreeData = DataById<{ members: number[] }>;
export type LogsData = DataById<Log>;
export type ItemsData = DataById<Item>;
export type ItemTemplatesData = DataById<ItemTemplate>;
export type LogTemplatesData = DataById<LogTemplate>;
export type ItemRowsData = DataById<ItemRow>;
export type FieldsData = DataById<Field>;
export type NotesData = DataById<NoteWithIds>;
export type HabitsData = DataById<HabitWithIds>;
export type HabitEntriesData = DataById<HabitEntry>;
export type OccurrencesData = DataById<Occurrence>;
export type RecurrencesData = DataById<Recurrence>;
