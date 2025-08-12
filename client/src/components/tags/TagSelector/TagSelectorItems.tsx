import type {
	TagSelectorItemProps,
	TagSelectorItemsProps
} from "@/components/tags/TagSelector/tag-selector.types";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import { useModalState } from "@/lib/state/modal-state";
import S from "./style/TagSelector.style";

function TagSelectorItem(p: TagSelectorItemProps) {
	const hasParent = p.tag.parent_id !== null;
	const isSelected = p.tagSelection?.[+p.tag.tag_id] ?? false;

	return (
		<S.ListItem
			$hasParent={hasParent}
			$isSelected={isSelected}
			key={p.tag.tag_id}
			onClick={() => p.updateTagSelection(p.tag.tag_id)}
		>
			{p.tag.name}
		</S.ListItem>
	);
}

// TODO: put logic in a component hook, extract inline styles, use
// isProbablySuspended pattern.
export function TagSelectorItems({
	modalId,
	filteredTags,
	tagSelection,
	updateTagSelection
}: TagSelectorItemsProps) {
	const { openModal } = useModalState();
	const { data: tags } = useQueryTags();
	const tagCount = tags?.size;

	if (!tags) return null;

	if (tagCount) {
		return filteredTags.map((tag) => (
			<TagSelectorItem
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
			}}
		>
			You do not have any tags yet. Click to add one.
		</S.CreateTagButton>
	);
}
