import { queryClient } from "@lib/query-client";
import { useTagSelection } from "@lib/state/selected-tags-state";
import { type NewTag, newTagSchema } from "@shared/lib/schemas/tag";
import { useEffect, useState } from "react";
import { useMutateNewTag } from "@/lib/hooks/query/tags/useMutateNewTag";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";

export default function useNewTag({
	tagSelectorId,
}: {
	tagSelectorId: string;
}) {
	const { data: tags } = useQueryTags();
	const { mutate: submit } = useMutateNewTag();

	const [newTag, setNewTag] = useState<Partial<NewTag>>({});

	const { selectedTagIds, resetTagSelection } = useTagSelection(tagSelectorId);

	const parent_id = selectedTagIds.length === 1 ? selectedTagIds[0] : undefined;
	const { closeModal } = useModalState();

	useEffect(() => {
		// make sure we reset tag selection on mount so that we don't accidentally
		// get an already-active selection into this new tag's state.
		resetTagSelection();

		return () => {
			resetTagSelection();
		};
	}, []);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewTag((current) => ({ ...current, [e.target.name]: e.target.value }));
	}

	function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		e.stopPropagation();

		const parsedTag = newTagSchema.safeParse(newTag);
		if (!parsedTag.success) {
			return;
		}

		submit(
			{ newTag: parsedTag.data, parent_id },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: trpc.tags.q.all.queryKey(),
					});
					closeModal(modalIds.tagSelector.activityForm);
				},
			}
		);
	}

	return {
		newTag,
		isValidNewTag: newTagSchema.safeParse(newTag).success,
		handleInputChange,
		handleSubmit,
		tags,
	};
}
