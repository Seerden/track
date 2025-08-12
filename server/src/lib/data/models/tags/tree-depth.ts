import type { TagWithIds } from "@shared/lib/schemas/tag";
import type { ByIdMap } from "@shared/types/data/utility.types";

/**
 * @todo (TRK-249) can we build this depth-tree server-side, cache it, and include it with
 * the tagsTree or tags query, then rework TagsTree to use that instead of
 * building everything recursively in-place (or at least not do level = level +
 * 1 for children, but use the depth map for each level)? */
export function buildTagDepthTree(tags: ByIdMap<TagWithIds>) {
	const tagDepthMap: Map<TagWithIds["tag_id"], number> = new Map();

	for (const tag of Array.from(tags.values())) {
		let depth = 0;

		let currentTag: TagWithIds | undefined = tag;

		while (currentTag.parent_id) {
			console.log(currentTag.parent_id);
			currentTag = tags.get(currentTag.parent_id);

			if (!currentTag) {
				break;
			}

			depth++;
		}

		tagDepthMap.set(tag.tag_id, depth);
	}

	return tagDepthMap;
}
