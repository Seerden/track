import type { TagWithIds } from "@shared/lib/schemas/tag";
import type { MouseEvent } from "react";
import { createDate } from "@/lib/datetime/make-date";
import { useDeleteTagMutation } from "@/lib/hooks/query/tags/useDeleteTagMutation";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";

export function useDetailedTag(tag: TagWithIds) {
	const { mutate: mutateDeleteTag } = useDeleteTagMutation();
	const humanizedCreatedAt = createDate(tag.created_at).fromNow();
	const { data: tags } = useQueryTags();

	function handleDeleteTag(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();

		mutateDeleteTag({ tag_id: tag.tag_id });
	}

	return {
		handleDeleteTag,
		humanizedCreatedAt,
		tags,
	};
}
