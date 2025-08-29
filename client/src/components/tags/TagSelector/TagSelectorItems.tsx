import type {
	TagSelectorItemProps,
	TagSelectorItemsProps,
} from "@/components/tags/TagSelector/tag-selector.types";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import { useModalState } from "@/lib/state/modal-state";
import S from "./style/TagSelector.style";

function TagSelectorItem({
	tag,
	tagSelection,
	updateTagSelection,
	id,
}: TagSelectorItemProps & { id: string }) {
	const hasParent = tag.parent_id !== null;
	const isSelected = tagSelection.get(id)?.includes(tag.tag_id) ?? false;

	return (
		<S.ListItem
			role="button"
			tabIndex={0}
			$hasParent={hasParent}
			$isSelected={isSelected}
			key={tag.tag_id}
			onClick={() => updateTagSelection(tag.tag_id)}>
			{tag.name}
		</S.ListItem>
	);
}

// TODO: put logic in a component hook, extract inline styles, use
// isProbablySuspended pattern.
export function TagSelectorItems({
	modalId,
	id,
	filteredTags,
	tagSelection,
	updateTagSelection,
}: TagSelectorItemsProps & { id: string }) {
	const { openModal } = useModalState();
	const { data: tags } = useQueryTags();
	const tagCount = tags?.size;

	if (!tags) return null;

	if (tagCount) {
		return filteredTags.map((tag) => (
			<TagSelectorItem
				id={id}
				tagSelection={tagSelection}
				updateTagSelection={updateTagSelection}
				key={tag.tag_id}
				tag={tag}
			/>
		));
	}

	if (filteredTags.length === 0) {
		return <p>No tags found for selected filter.</p>;
	}

	return (
		<S.CreateTagButton
			type="button"
			onClick={(e) => {
				openModal(modalId);
				e.stopPropagation();
			}}>
			You do not have any tags yet. Click to add one.
		</S.CreateTagButton>
	);
}
