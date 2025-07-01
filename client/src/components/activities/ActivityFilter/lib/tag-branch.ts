import type { TagsTreeData } from "@/types/data.types";
import type { TagWithIds } from "@shared/lib/schemas/tag";
import type { ByIdMap, ID } from "@shared/types/data/utility.types";

// TODO: on the server, we have a findRootTag function. Put it in shared and use
// it both here and there.
export function getRootTagId(tag_id: ID, tagsById: ByIdMap<TagWithIds>) {
	const tag = tagsById.get(String(tag_id));
	if (!tag) return;
	if (!tag.parent_id) return tag.tag_id;
	if (tag.parent_id) return getRootTagId(tag.parent_id, tagsById);
	return;
}

export function getTreeMembers(
	tag_id: ID,
	tagsById: ByIdMap<TagWithIds>,
	tagTree: ByIdMap<TagsTreeData["byId"][number]>
): ID[] {
	const rootTagId = getRootTagId(tag_id, tagsById);
	if (!rootTagId) return [];
	return tagTree.get(rootTagId)?.members ?? [];
}
