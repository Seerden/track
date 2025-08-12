import type { TagWithIds } from "@shared/lib/schemas/tag";
import type { ByIdMap } from "@shared/types/data/utility.types";

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
