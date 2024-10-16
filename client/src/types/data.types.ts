import type { Data } from "./query.types";
import type { TagWithIds } from "./server/tag.types";
import type { ById } from "./server/utility.types";

export type TagsData = Data<"tagsById", ById<TagWithIds>>;
