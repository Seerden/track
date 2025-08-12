import type { TagsTree, TagWithId, TagWithIds } from "@shared/lib/schemas/tag";
import type { TagTagRelation } from "@shared/types/data/relational.types";
import type { ByIdMap, ID } from "@shared/types/data/utility.types";
import { queryTagsAndRelations } from "./query-tags";

/**
 * function that merges { tags, relations } into a single hash map of tags with
 * children (like TagWithIds, except an object with key tag_id and values
 * Omit<TagWithIds, 'tag_id'>)
 *
 * To be used with, for example, the result of queryTagsAndRelations()
 **/
export function mergeTagsAndRelations({
	tags,
	relations,
}: {
	tags: TagWithId[];
	relations: TagTagRelation[];
}): ByIdMap<TagWithIds> {
	// TODO TRK-249: use a map instead of a ById object
	const tagMap: Map<TagWithIds["tag_id"], TagWithIds> = new Map();

	for (const tag of tags) {
		tagMap.set(tag.tag_id, { ...tag, child_ids: [], parent_id: null });
	}

	for (const { child_id, parent_id } of relations) {
		const tag = tagMap.get(parent_id);
		if (!tag) continue; // TODO TRK-249: throw
		tag.child_ids?.push(child_id);
		tagMap.set(child_id, { ...tagMap.get(child_id)!, parent_id });
	}

	return tagMap;
}

/** Gets all of a user's tags and tag relations and puts them into a map (by id). */
export async function getTagsWithRelations({ user_id }: { user_id: ID }) {
	const { tags, relations } = await queryTagsAndRelations({ user_id });

	return mergeTagsAndRelations({ tags, relations });
}

/** Given a tagsById object, create a map that groups the tags by the id of
 * their top-level ancestor.
 * @note each root tag is part of its own tree by definition, so if id 1
 * represents a root tag, then treeIdMap.get(`1`) includes `1`. */
export function createTagTreeMap(tags: ByIdMap<TagWithIds>) {
	const treeIdMap: TagsTree = new Map();

	for (const tag_id of tags.keys()) {
		const root_id = findRootTag(tag_id, tags);
		if (!root_id) {
			throw new Error(`Root tag not found for tag_id ${tag_id}`);
		}

		treeIdMap.set(root_id, (treeIdMap.get(root_id) ?? []).concat(tag_id));
	}

	return treeIdMap;
}

/** Given a tag_id, find the tag_id of the root parent tag (i.e. its top-level ancestor) */
export function findRootTag(tag_id: ID, tags: ByIdMap<TagWithIds>) {
	let currentTag = tags.get(tag_id);
	if (!currentTag) {
		throw new Error(`Tag with id ${tag_id} not found in tags map.`);
	}

	while (currentTag?.parent_id) {
		currentTag = tags.get(currentTag.parent_id);
		if (currentTag && !currentTag.parent_id) {
			return currentTag.tag_id;
		}
	}

	return currentTag?.tag_id;
}
