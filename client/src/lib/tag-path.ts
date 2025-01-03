import type { TagWithIds } from "@shared/types/data/tag.types";
import type { Maybe } from "@shared/types/data/utility.types";

/** Given a `tag`, and `tags` which is assumed to be the complete list of a
 * user's tags, build an array of tag names that represents `tag`'s "family
 * tree". */
export function makePath(tag: Maybe<TagWithIds>, tags: TagWithIds[]): string[] {
	if (!tag) return [];

	if (!tag.parent_id) {
		return [tag.name];
	}
	return [
		tag.name,
		...makePath(
			tags.find((t) => t.tag_id === tag.parent_id),
			tags
		)
	];
}
