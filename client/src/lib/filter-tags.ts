import type { TagWithIds } from "@t/data/tag.types";
import type { ByIdMap, ID, Maybe } from "@t/data/utility.types";

/**
 * Given a tagsById object and a list of tag `ids`, return the list of tags that
 * match the `ids`.
 * @todo check all usage of this to make sure we're always passing a map of
 * tagsById instead of an object (TRK-176).
 */
export function filterTagsById(
	ids: Maybe<ID[]>,
	tagsById: ByIdMap<TagWithIds> = new Map()
): TagWithIds[] {
	if (!ids?.length) return [];

	const tags = Object.values(tagsById);

	return tags.filter(({ tag_id }) => ids.includes(tag_id));
}
