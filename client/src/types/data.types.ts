import { Data } from "./query.types";
import { TagWithIds } from "./server/tag.types";
import { ById } from "./server/utility.types";

export type TagsData = Data<"tagsById", ById<TagWithIds>>;
