import type { TagTagRelation } from "../../../types/data/relational.types";
import type { TagWithId, TagWithIds } from "../../../types/data/tag.types";
import { ID } from "../../../types/data/utility.types";
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
	const tagsById = {} as Record<ID, TagWithIds>;
	for (const tag of tags) {
		tagsById[tag.tag_id] = { ...tag, child_ids: [], parent_id: null };
	}

	for (const { child_id, parent_id } of relations) {
		tagsById[parent_id]?.child_ids?.push(child_id);
		(tagsById[child_id] ?? {}).parent_id = parent_id;
	}

	return tagsById;
}

export async function getTagsWithRelations({ user_id }: { user_id: ID }) {
	const { tags, relations } = await queryTagsAndRelations({ user_id });

	if (!tags.length) return {};

	return mergeTagsAndRelations({ tags, relations });
}
