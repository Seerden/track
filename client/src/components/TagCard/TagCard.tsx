import { TagWithIds } from "../../types/server/tag.types";
import * as S from "./TagCard.style";

function TagCard({ tag }: { tag: TagWithIds }) {
	return (
		<S.Tag>
			<span>{tag.name}</span>
		</S.Tag>
	);
}

export default TagCard;
