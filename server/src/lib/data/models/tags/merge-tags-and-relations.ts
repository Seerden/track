import type { TagTagRelation } from "@t/data/relational.types";
import type { TagWithId, TagWithIds } from "@t/data/tag.types";
import type { ById, ID } from "@t/data/utility.types";
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
}) {
	const tagsById = {} as ById<TagWithIds>;
	for (const tag of tags) {
		tagsById[tag.tag_id] = { ...tag, child_ids: [], parent_id: null };
	}

	for (const { child_id, parent_id } of relations) {
		tagsById[parent_id]?.child_ids?.push(child_id);
		(tagsById[child_id] ?? {}).parent_id = parent_id;
	}

	return tagsById;
}

/** Gets all of a user's tags and tag relations and puts them into a tagsById object. */
export async function getTagsWithRelations({ user_id }: { user_id: ID }) {
	const { tags, relations } = await queryTagsAndRelations({ user_id });

	if (!tags.length) return {};

	return mergeTagsAndRelations({ tags, relations });
}

/** Given a tagsById object, create a hashmap that groups the tags by the id of
 * their top-level ancestor. */
export function createTagTreeMap(tagsById: ById<TagWithIds>) {
	const treeIdMap = {} as ById<{ members: ID[] }>;

	for (const tag_id in tagsById) {
		const root_id = findRootTag(+tag_id, tagsById);
		if (!treeIdMap[root_id]) {
			treeIdMap[root_id] = { members: [] };
		}
		treeIdMap[root_id].members.push(+tag_id);
	}

	return treeIdMap;
}

/** Given a tag_id, find the tag_id of the root parent tag (i.e. its top-level ancestor) */
function findRootTag(tag_id: ID, tagsById: ById<TagWithIds>) {
	let currentTag = tagsById[tag_id];
	while (currentTag.parent_id) {
		currentTag = tagsById[currentTag.parent_id];
	}
	return currentTag.tag_id;
}
