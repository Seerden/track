import type {
	TagInTree,
	TagsInTree,
	TagWithIds,
} from "@shared/lib/schemas/tag";
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
export function findAncestors({
	tag,
	tags,
}: {
	tag: TagWithIds;
	tags: TagsInTree;
}) {
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
export function findChildren({
	tag,
	tags,
}: {
	tag: TagWithIds;
	tags: TagsInTree;
}) {
	return tag.child_ids
		?.map((id) => getTag({ id, tags }))
		.filter((maybeTag) => maybeTag !== null);
}

/** Find the siblings of `tag`. `tag` itself is also considered a sibling. */
export function findSiblings({
	tag,
	tags,
}: {
	tag: TagWithIds;
	tags: TagsInTree;
}) {
	const tagInTree = getTag({ id: tag.tag_id, tags });

	if (!tagInTree) {
		throw new Error(
			"findSiblings: could not find provided tag in provided tags."
		);
	}

	const treeId = tagInTree.tree_root_id;
	const tagDepth = tagInTree.tree_depth;
	return [...tags.values()].filter((t) => {
		return t.tree_depth === tagDepth && t.tree_root_id === treeId;
	});
}
