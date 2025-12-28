import { isNullish } from "@shared/lib/is-nullish";
import { newTagSchema, type TagsInTree } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";
import type { TagState } from "@/components/tags/TagForm/useTagForm";

export function buildPreviewTags({
	tag,
	tags,
	parent_id,
}: {
	tag: TagState;
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
			parent_id,
			tree_depth: !isNullish(parentDepth) ? parentDepth + 1 : 0,
			tree_root_id: rootId ?? "preview",
			child_ids: [],
			// we do this for both existing and new tags, because there is styling
			// that depends on this
			tag_id: "preview",
			user_id: "",
			created_at: new Date(),
		});
	}

	return previewTags;
}
