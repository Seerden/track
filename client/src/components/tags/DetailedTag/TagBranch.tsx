import { findAncestors, findChildren } from "@/components/tags/DetailedTag/build-branch";
import { trpc } from "@/lib/trpc";
import type { TagWithIds } from "@shared/types/data/tag.types";
import { useQuery } from "@tanstack/react-query";
import S from "./style/TagBranch.style";

/** A single row to-be-displayed inside TagTreeBranch. The branch consists of
 * any number of rows, where a row represents one level of the tree/branch. */
function Row({ tags }: { tags: TagWithIds[] }) {
	return (
		<S.Row
			style={{
				display: "flex",
				flexDirection: "row"
			}}
		>
			{tags.map((tag) => (
				<S.Node key={tag.tag_id}>{tag.name}</S.Node>
			))}
		</S.Row>
	);
}

type TagBranchProps = {
	tag: TagWithIds;
};

/** A small visual display of a `tag`'s family tree.
 * @todo currently this component shows direct ancestors (i.e. this tag's
 * parent, its parent, and so on), the tag itself, and direct children. We could
 * expand it to show all descendants, siblings, and siblings of ancestors (i.e.
 * the whole family tree for this parent's branch traced back to the root).
 */
export default function TagBranch({ tag }: TagBranchProps) {
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());

	if (!tagsData) return null;

	const children = findChildren({ tag, tagsById: tagsData.byId });
	const ancestors = findAncestors({ tag, tagsById: tagsData.byId });

	const branch = [...ancestors, tag, children] as const;

	return (
		<S.Branch>
			<S.Title>
				<span>tag tree</span>
			</S.Title>
			{branch.map((item, index) => {
				if (!item) return null;

				if (Array.isArray(item)) {
					if (!item.length) return null;
					return <Row key={index} tags={item} />;
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
