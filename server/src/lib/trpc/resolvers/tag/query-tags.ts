import {
	createTagTreeMap,
	getTagsWithRelations,
} from "@/lib/data/models/tags/merge-tags-and-relations";
import { buildTagDepthTree } from "@/lib/data/models/tags/tree-depth";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import type { TagInTree, TagsTree, TagWithIds } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";

/** Given a tag and a tag tree (assumed to be a user's complete tag tree, find
 * the tag id for the root of the branch that `tag` belongs to.) */
function findRootUsingTree(tag: TagWithIds, tree: TagsTree) {
	// find the key of the value of tree that contains the tag's id
	for (const [branchRootTagId, tagsInBranch] of tree.entries()) {
		if (branchRootTagId === tag.tag_id || tagsInBranch.includes(tag.tag_id)) {
			return branchRootTagId;
		}
	}
}

export const queryTags = authenticatedProcedure.query(async ({ ctx }) => {
	console.log("called queryTags");

	const tags = await getTagsWithRelations({ user_id: ctx.req.session.user.user_id });

	// TODO TRK-249: include tag depth and tree root id in every tag entry and
	// create a type for the output
	const tree = createTagTreeMap(tags);
	const treeDepth = buildTagDepthTree(tags);

	const tagsInTree = new Map<ID, TagInTree>();
	for (const tag of tags.values()) {
		const rootId = findRootUsingTree(tag, tree);
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
	const tagsById = await getTagsWithRelations({ user_id: ctx.req.session.user.user_id });
	return createTagTreeMap(tagsById);
});
