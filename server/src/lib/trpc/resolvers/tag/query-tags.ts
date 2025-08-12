import {
	createTagTreeMap,
	findRootTag,
	getTagsWithRelations,
} from "@/lib/data/models/tags/merge-tags-and-relations";
import { buildTagDepthTree } from "@/lib/data/models/tags/tree-depth";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import type { TagInTree } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";

export const queryTags = authenticatedProcedure.query(async ({ ctx }) => {
	const tags = await getTagsWithRelations({ user_id: ctx.req.session.user.user_id });
	const treeDepth = buildTagDepthTree(tags);

	const tagsInTree = new Map<ID, TagInTree>();
	for (const tag of tags.values()) {
		const rootId = findRootTag(tag.tag_id, tags);
		if (!rootId) {
			// TODO: this occurs when a tag has no parent, but it shouldn't
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

export const queryTagTree = authenticatedProcedure.query(async ({ ctx }) => {
	const tags = await getTagsWithRelations({ user_id: ctx.req.session.user.user_id });
	return createTagTreeMap(tags);
});
