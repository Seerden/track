import type { ActivityWithIds } from "@t/data/activity.types";
import type { HabitEntry, HabitWithIds } from "@t/data/habit.types";
import type { NoteWithIds } from "@t/data/note.types";
import type { DataById } from "./query.types";
import type { TagWithIds } from "./server/tag.types";

// TODO: all these types come from the backend, so they should be moved to the
// server folder, and also be used directly on the server.

export type TagsData = DataById<TagWithIds>;
export type ActivitiesData = DataById<ActivityWithIds>;
export type NotesData = DataById<NoteWithIds>;
export type TagsTreeData = DataById<{ members: number[] }>;
export type HabitsData = DataById<HabitWithIds>;
export type HabitEntriesData = DataById<HabitEntry>;
