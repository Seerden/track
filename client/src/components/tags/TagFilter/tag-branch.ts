import type { TagsTree, TagWithIds } from "@shared/lib/schemas/tag";
import type { ByIdMap, ID } from "@shared/types/data/utility.types";

// TODO: on the server, we have a findRootTag function. Put it in shared and use
// it both here and there.
function getRootTagId(tag_id: ID, tags: ByIdMap<TagWithIds>) {
	const tag = tags.get(tag_id);

	if (!tag) {
		return;
	}

	if (!tag.parent_id) {
		return tag.tag_id;
	}

	if (tag.parent_id) {
		return getRootTagId(tag.parent_id, tags);
	}

	return;
}

export function getTreeMembers(
	tag_id: ID,
	tags: ByIdMap<TagWithIds>,
	tagTree: TagsTree
): ID[] {
	const rootTagId = getRootTagId(tag_id, tags);

	if (!rootTagId) {
		return [];
	}

	return tagTree.get(rootTagId) ?? [];
}
