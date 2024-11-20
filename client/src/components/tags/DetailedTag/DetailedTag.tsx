import TagTreeBranch from "@/components/tags/DetailedTag/TagBranch";
import { formatDate } from "@/lib/datetime/format-date";
import { createDate } from "@/lib/datetime/make-date";
import C from "@/lib/theme/components/Card.style";
import type { TagWithIds } from "@t/data/tag.types";
import S from "./style/DetailedTag.style";

type DetailedTagProps = {
	tag: TagWithIds;
};

export default function DetailedTag({ tag }: DetailedTagProps) {
	const humanizedCreatedAt = createDate(tag.created_at).fromNow();

	return (
		<S.Wrapper>
			<C.Title>{tag.name}</C.Title>
			<p>{tag.description}</p>
			<TagTreeBranch tag={tag} />
			<C.Datetime>
				<span title={formatDate(tag.created_at)}>created {humanizedCreatedAt}</span>
			</C.Datetime>
		</S.Wrapper>
	);
}
