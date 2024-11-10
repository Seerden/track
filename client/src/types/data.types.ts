import type { ActivityWithIds } from "@/types/server/activity.types";
import type { NoteWithIds } from "@/types/server/note.types";
import type { DataById } from "./query.types";
import type { TagWithIds } from "./server/tag.types";

// TODO: all these types come from the backend, so they should be moved to the
// server folder, and also be used directly on the server.

export type TagsData = DataById<TagWithIds>;
export type ActivitiesData = DataById<ActivityWithIds>;
export type NotesData = DataById<NoteWithIds>;
export type TagsTreeData = DataById<{ members: number[] }>;
