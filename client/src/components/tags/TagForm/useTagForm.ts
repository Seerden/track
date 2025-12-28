import { useTagSelection } from "@lib/state/selected-tags-state";
import { isNullish } from "@shared/lib/is-nullish";
import {
	type NewTag,
	newTagSchema,
	type TagInTree,
	tagInTreeSchema,
} from "@shared/lib/schemas/tag";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { buildPreviewTags } from "@/components/tags/TagForm/build-preview";
import {
	useMutateNewTag,
	useMutateTag,
} from "@/lib/hooks/query/tags/useMutateNewTag";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import modalIds, { type ModalId } from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";

export type TagState = Partial<NewTag> | TagInTree;

export default function useTagForm({
	tagSelectorId,
	modalId,
	tag: existingTag,
}: {
	tagSelectorId: string;
	modalId: ModalId;
	tag?: TagInTree;
}) {
	const isEditing = !isNullish(existingTag);
	const { closeModal } = useModalState();
	const { data: tags } = useQueryTags();
	const { mutate: submit } = useMutateNewTag();
	const { mutate: submitTagUpdate } = useMutateTag();

	const [tag, setTag] = useState<TagState>(existingTag ?? {});

	const parsedNewTag = newTagSchema.safeParse(tag);
	const isValidNewTag = parsedNewTag.success;

	const parsedExistingTag = tagInTreeSchema.safeParse(tag);
	const isValidTag = parsedExistingTag.success;

	const { selectedTagIds, resetTagSelection, setTagSelectionFromList } =
		useTagSelection(tagSelectorId);
	const parent_id = selectedTagIds.length === 1 ? selectedTagIds[0] : undefined;

	const previewTags = buildPreviewTags({
		tag,
		isValidNewTag,
		tags,
		parent_id,
	});

	useEffect(() => {
		// make sure we set or reset tag selection on mount so that we don't
		// accidentally get an already-active selection into tag's state.
		if (!isNullish(existingTag)) {
			setTagSelectionFromList(
				existingTag.parent_id ? [existingTag.parent_id] : []
			);
		} else {
			resetTagSelection();
		}

		return () => {
			resetTagSelection();
		};
	}, []);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTag(
			produce((draft) => {
				draft[e.target.name as keyof typeof draft] = e.target.value;
			})
		);
	}

	function _handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		e.stopPropagation();

		if (isEditing) {
			handleSubmitTag();
		} else {
			handleSubmitNewTag();
		}
	}

	function handleSubmitTag() {
		if (!isValidTag) {
			return;
		}

		submitTagUpdate(
			{ tag: parsedExistingTag.data, parent_id },
			{
				onSuccess: () => {
					closeModal(modalId);
				},
			}
		);
	}

	function handleSubmitNewTag() {
		if (!parsedNewTag.success) {
			return;
		}

		submit(
			{ newTag: parsedNewTag.data, parent_id },
			{
				// invalidation happens in the mutate hook onSuccess
				onSuccess: () => {
					closeModal(modalId);
					closeModal(modalIds.tagSelector.activityForm);
				},
			}
		);
	}

	return {
		tag,
		isValidNewTag,
		isValidTag,
		handleInputChange,
		handleSubmit: _handleSubmit,
		tags,
		previewTags,
	};
}
