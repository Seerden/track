import type { TagWithIds } from "@t/data/tag.types";
import type { ById, ID } from "@t/data/utility.types";

/** Gets a tag by id from a TagsById object.
 * @todo I know for a fact I already have something like this somewhere. *
 */
export function getTag({ id, tagsById }: { id: ID; tagsById: ById<TagWithIds> }) {
	const tag = tagsById[id];
	if (!tag) return null;
	return tag;
}

/** Given a `tag` and a `tagsById` object, find (recursively) all direct
 * ancestors of `tag`. */
export function findAncestors({
	tag,
	tagsById
}: {
	tag: TagWithIds;
	tagsById: ById<TagWithIds>;
}) {
	const ancestors: TagWithIds[] = [];
	let parentId = tag.parent_id;
	while (parentId) {
		const parent = getTag({ id: parentId, tagsById });
		if (!parent) break;
		ancestors.push(parent);
		parentId = parent.parent_id;
	}

	return ancestors;
}

/** Given a `tag` and a `tagsById` object, find all direct children of `tag`.
 * Does not recursively find their descendants. */
export function findChildren({
	tag,
	tagsById
}: {
	tag: TagWithIds;
	tagsById: ById<TagWithIds>;
}) {
	return tag.child_ids
		?.map((id) => getTag({ id, tagsById }))
		.filter((maybeTag) => maybeTag !== null);
}
