import type { TagWithIds } from "@shared/lib/schemas/tag";
import TagBranch from "@/components/tags/DetailedTag/TagBranch";
import { formatDate } from "@/lib/datetime/format-date";
import { createDate } from "@/lib/datetime/make-date";
import Card from "@/lib/theme/components/Card.style";
import S from "./style/DetailedTag.style";

type DetailedTagProps = {
	tag: TagWithIds;
};

export default function DetailedTag({ tag }: DetailedTagProps) {
	const humanizedCreatedAt = createDate(tag.created_at).fromNow();

	return (
		<S.Wrapper>
			<Card.Title>{tag.name}</Card.Title>
			<p>{tag.description}</p>
			<TagBranch tag={tag} />
			<Card.Datetime>
				<span title={formatDate(tag.created_at)}>
					created {humanizedCreatedAt}
				</span>
			</Card.Datetime>
		</S.Wrapper>
	);
}
