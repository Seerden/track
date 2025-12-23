import { queryClient } from "@lib/query-client";
import { useTagSelection } from "@lib/state/selected-tags-state";
import { type NewTag, newTagSchema } from "@shared/lib/schemas/tag";
import { useEffect, useState } from "react";
import { buildPreviewTags } from "@/components/tags/TagForm/build-preview";
import { useMutateNewTag } from "@/lib/hooks/query/tags/useMutateNewTag";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";

export default function useTagForm({
	tagSelectorId,
}: {
	tagSelectorId: string;
}) {
	const { closeModal } = useModalState();
	const { data: tags } = useQueryTags();
	const { mutate: submit } = useMutateNewTag();
	const [newTag, setNewTag] = useState<Partial<NewTag>>({});
	const parsedNewTag = newTagSchema.safeParse(newTag);
	const isValidNewTag = parsedNewTag.success;
	const { selectedTagIds, resetTagSelection } = useTagSelection(tagSelectorId);
	const parent_id = selectedTagIds.length === 1 ? selectedTagIds[0] : undefined;
	const previewTags = buildPreviewTags({
		tag: newTag,
		isValidNewTag,
		tags,
		parent_id,
	});

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
		isValidNewTag,
		handleInputChange,
		handleSubmit,
		tags,
		previewTags,
	};
}
