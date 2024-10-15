import type { TagWithIds } from "../types/server/tag.types";
import type { ById, ID } from "../types/server/utility.types";

/**
 * Given a tagsById object and a list of tag `ids`, return the list of tags that
 * match the `ids`.
 */
export function filterTagsById(ids: ID[], tagsById: ById<TagWithIds> = {}): TagWithIds[] {
	const tags = Object.values(tagsById);

	return tags.filter(({ tag_id }) => ids.includes(tag_id));
}
