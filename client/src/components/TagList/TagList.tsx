import { type TagWithIds } from "../../types/server/tag.types";
import TagCard from "../TagCard/TagCard";
import * as S from "./TagList.style";

function TagList({ tags }: { tags: Array<TagWithIds> }) {
	return (
		<S.List>
			{tags.map((tag) => (
				<TagCard key={tag.tag_id} tag={tag} />
			))}
		</S.List>
	);
}

export default TagList;
