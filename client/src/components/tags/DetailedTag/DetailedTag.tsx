import { formatDate } from "@/lib/datetime/format-date";
import { createDate } from "@/lib/datetime/make-date";
import C from "@/lib/theme/components/Card.style";
import type { TagWithIds } from "@t/data/tag.types";

type DetailedTagProps = {
	tag: TagWithIds;
};

export default function DetailedTag({ tag }: DetailedTagProps) {
	const humanizedCreatedAt = createDate(tag.created_at).fromNow();

	return (
		<div>
			<C.Title>{tag.name}</C.Title>
			<p>{tag.description}</p>
			<C.Datetime>
				<span title={formatDate(tag.created_at)}>Created {humanizedCreatedAt}</span>
			</C.Datetime>
		</div>
	);
}
