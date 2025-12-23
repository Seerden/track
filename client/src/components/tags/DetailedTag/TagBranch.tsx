import type { TagsInTree, TagWithIds } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";
import type { ReactNode } from "react";
import {
	findAncestors,
	findChildren,
	findSiblings,
} from "@/components/tags/DetailedTag/build-branch";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import S from "./style/TagBranch.style";

/** A single row to-be-displayed inside TagTreeBranch. The branch consists of
 * any number of rows, where a row represents one level of the tree/branch. */
function TagRow({ tags, highlight }: { tags: TagWithIds[]; highlight?: ID }) {
	return (
		<S.Row>
			{tags.map((tag) => (
				<S.Node $active={tag.tag_id === highlight} key={tag.tag_id}>
					{tag.name}
				</S.Node>
			))}
		</S.Row>
	);
}

type TagBranchProps = {
	tag: TagWithIds | undefined;
	tags?: TagsInTree;
	preview?: boolean;
	title?: ReactNode;
};

/** A small visual display of a `tag`'s family tree.
 * @todo currently this component shows direct ancestors (i.e. this tag's
 * parent, its parent, and so on), the tag itself, and direct children. We could
 * expand it to show all descendants, siblings, and siblings of ancestors (i.e.
 * the whole family tree for this parent's branch traced back to the root). */
export default function TagBranch({
	tag,
	tags,
	preview,
	title = "tag tree",
}: TagBranchProps) {
	const { data: existingTags } = useQueryTags();

	if (!existingTags || tags?.size === 0 || !tag) return null;

	// if tags were passed from outside (e.g. mock tags for a branch preview),
	// use those instead of the existing tags from the query.
	const tagsForBranch = tags ?? existingTags;

	const children = findChildren({ tag, tags: tagsForBranch });
	const ancestors = findAncestors({ tag, tags: tagsForBranch });
	const siblings = findSiblings({ tag, tags: tagsForBranch });

	const branch = [
		...ancestors.sort(
			(a, b) =>
				// TODO: notify when a or b does not exist in depth map
				a.tree_depth - b.tree_depth
		),
		siblings,
		children,
	] as Array<TagWithIds | TagWithIds[]>;

	return (
		<S.Branch $preview={preview}>
			<S.Title>
				<span>{title}</span>
			</S.Title>
			{branch.map((item, index) => {
				if (!item) return null;

				if (Array.isArray(item)) {
					if (!item.length) return null;
					return <TagRow key={index} tags={item} highlight={tag.tag_id} />;
				}
				return (
					<S.Row key={item.tag_id}>
						<S.Node $active={item.tag_id === tag.tag_id}>{item.name}</S.Node>
					</S.Row>
				);
			})}
		</S.Branch>
	);
}
