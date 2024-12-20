import type { TagWithIds } from "@t/data/tag.types";
import type { ById, ID, Maybe } from "@t/data/utility.types";

/**
 * Given a tagsById object and a list of tag `ids`, return the list of tags that
 * match the `ids`.
 */
export function filterTagsById(
	ids: Maybe<ID[]>,
	tagsById: ById<TagWithIds> = {}
): TagWithIds[] {
	if (!ids?.length) return [];

	const tags = Object.values(tagsById);

	return tags.filter(({ tag_id }) => ids.includes(tag_id));
}
