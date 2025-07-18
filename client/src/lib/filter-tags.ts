import { byIdAsList } from "@shared/lib/map";
import type { TagWithIds } from "@shared/lib/schemas/tag";
import type { ByIdMap, ID, Maybe } from "@shared/types/data/utility.types";

/**
 * Given a tagsById object and a list of tag `ids`, return the list of tags that
 * match the `ids`.
 */
export function filterTagsById(
	ids: Maybe<ID[]>,
	tagsById: ByIdMap<TagWithIds> = new Map()
): TagWithIds[] {
	if (!ids?.length) return [];

	const tags = byIdAsList(tagsById);

	return tags.filter(({ tag_id }) => ids.includes(tag_id));
}
