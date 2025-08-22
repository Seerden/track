import type { TagInTree, TagWithIds, TagsInTree } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";

/** Gets a tag by id from a tags object.
 * @todo I know for a fact I already have something like this somewhere. *
 */
export function getTag({ id, tags }: { id: ID; tags: TagsInTree }) {
	const tag = tags.get(id);
	if (!tag) return null;
	return tag;
}

/** Given a `tag` and a `tags` object, find (recursively) all direct
 * ancestors of `tag`. */
export function findAncestors({ tag, tags }: { tag: TagWithIds; tags: TagsInTree }) {
	const ancestors: TagInTree[] = [];
	let parentId = tag.parent_id;
	while (parentId) {
		const parent = getTag({ id: parentId, tags });
		if (!parent) break;
		ancestors.push(parent);
		parentId = parent.parent_id;
	}

	return ancestors;
}

/** Given a `tag` and a `tags` object, find all direct children of `tag`.
 * Does not recursively find their descendants. */
export function findChildren({ tag, tags }: { tag: TagWithIds; tags: TagsInTree }) {
	return tag.child_ids
		?.map((id) => getTag({ id, tags }))
		.filter((maybeTag) => maybeTag !== null);
}
