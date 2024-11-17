import type { TagWithIds } from "@type/server/tag.types";
import S from "./style/TagCard.style";

function TagCard({ tag }: { tag: TagWithIds }) {
	return (
		<S.Tag>
			<span>{tag.name}</span>
		</S.Tag>
	);
}

export default TagCard;
