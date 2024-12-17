import type { TagsTreeData } from "@/types/data.types";
import type { TagWithIds } from "@t/data/tag.types";
import type { ById, ID } from "@t/data/utility.types";

// this basically already exists in build-branch.ts, so extract it from there
export function getRootTagId(tag_id: ID, tagsById: ById<TagWithIds>) {
	const tag = tagsById[tag_id];
	if (!tag) return;
	if (!tag.parent_id) return tag.tag_id;
	if (tag.parent_id) return getRootTagId(tag.parent_id, tagsById);
	return;
}

export function getTreeMembers(
	tag_id: ID,
	tagsById: ById<TagWithIds>,
	tagTree: TagsTreeData["byId"]
): ID[] {
	const rootTagId = getRootTagId(tag_id, tagsById);
	if (!rootTagId) return [];
	return tagTree[rootTagId].members;
}
