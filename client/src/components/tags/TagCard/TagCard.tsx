import type { TagWithIds } from "@shared/lib/schemas/tag";
import S from "./style/TagCard.style";

function TagCard({ tag }: { tag: TagWithIds }) {
	return (
		<S.Tag>
			<span>{tag.name}</span>
		</S.Tag>
	);
}

export default TagCard;
