import { isNullish } from "@shared/lib/is-nullish";
import {
	type NewTag,
	newTagSchema,
	type TagsInTree,
} from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";

export function buildPreviewTags({
	tag,
	tags,
	parent_id,
}: {
	tag: Partial<NewTag>;
	isValidNewTag?: boolean;
	tags?: TagsInTree;
	parent_id?: ID;
}) {
	const parsedNewTag = newTagSchema.safeParse(tag);
	const isValidNewTag = parsedNewTag.success;

	const previewTags = isValidNewTag ? structuredClone(tags) : undefined;
	if (isValidNewTag && previewTags) {
		const parentDepth = parent_id
			? previewTags.get(parent_id)?.tree_depth
			: null;
		const rootId = parent_id ? previewTags.get(parent_id)?.tree_root_id : null;

		previewTags.set("preview", {
			...parsedNewTag.data,
			user_id: "",
			tag_id: "preview",
			created_at: new Date(),
			parent_id,
			tree_depth: !isNullish(parentDepth) ? parentDepth + 1 : 0,
			tree_root_id: rootId ?? "preview",
			child_ids: [],
		});
	}

	return previewTags;
}
