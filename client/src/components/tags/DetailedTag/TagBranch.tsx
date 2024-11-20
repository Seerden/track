import { findAncestors, findChildren } from "@/components/tags/DetailedTag/build-branch";
import useTagsQuery from "@/lib/hooks/query/tags/useTagsQuery";
import type { TagWithIds } from "@t/data/tag.types";
import S from "./style/TagTreeBranch.style";

type TagTreeBranchProps = {
	tag: TagWithIds;
};

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

export default function TagTreeBranch({ tag }: TagTreeBranchProps) {
	const { data } = useTagsQuery();

	if (!data) return null;

	const children = findChildren({ tag, tagsById: data.byId });
	const ancestors = findAncestors({ tag, tagsById: data.byId });

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
