import type { DataById } from "./query.types";
import type { TagWithIds } from "./server/tag.types";

export type TagsData = DataById<TagWithIds>;
