import type { ActivityWithIds } from "@/types/server/activity.types";
import type { DataById } from "./query.types";
import type { TagWithIds } from "./server/tag.types";

export type TagsData = DataById<TagWithIds>;
export type ActivitiesData = DataById<ActivityWithIds>;
