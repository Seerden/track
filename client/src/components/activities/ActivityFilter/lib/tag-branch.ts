import type { TagsTreeData } from "@/types/data.types";
import type { TagWithIds } from "@t/data/tag.types";
import type { ByIdMap, ID } from "@t/data/utility.types";

// TODO: on the server, we have a findRootTag function. Put it in shared and use
// it both here and there.
export function getRootTagId(tag_id: ID, tagsById: ByIdMap<TagWithIds>) {
	const tag = tagsById.get(tag_id);
	if (!tag) return;
	if (!tag.parent_id) return tag.tag_id;
	if (tag.parent_id) return getRootTagId(tag.parent_id, tagsById);
	return;
}

export function getTreeMembers(
	tag_id: ID,
	tagsById: ByIdMap<TagWithIds>,
	tagTree: TagsTreeData["byId"]
): ID[] {
	const rootTagId = getRootTagId(tag_id, tagsById);
	if (!rootTagId) return [];
	return tagTree[rootTagId].members;
}
