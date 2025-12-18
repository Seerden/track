import type { TagInTree } from "@shared/lib/schemas/tag";
import type { MapById } from "@shared/types/data/utility.types";
import {
	createTagTreeMap,
	findRootTag,
	queryTagsWithRelations,
} from "@/lib/data/models/tags/merge-tags-and-relations";
import { buildTagDepthTree } from "@/lib/data/models/tags/tree-depth";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const tagsQuery = betterAuthProcedure.query(async ({ ctx }) => {
	const tags = await queryTagsWithRelations({
		user_id: ctx.user.id,
	});
	const treeDepth = buildTagDepthTree(tags);

	const tagsInTree: MapById<TagInTree> = new Map();
	for (const tag of tags.values()) {
		const rootId = findRootTag(tag.tag_id, tags);
		if (!rootId) {
			throw new Error(`Root tag not found for tag_id ${tag.tag_id}`);
		} else {
			tagsInTree.set(tag.tag_id, {
				...tag,
				tree_root_id: rootId,
				tree_depth: treeDepth.get(tag.tag_id) ?? -1,
			} satisfies TagInTree);
		}
	}

	return tagsInTree;
});

export const tagTreeQuery = betterAuthProcedure.query(async ({ ctx }) => {
	const tags = await queryTagsWithRelations({
		user_id: ctx.user.id,
	});
	return createTagTreeMap(tags);
});
