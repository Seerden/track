import type {
	TagSelectorItemProps,
	TagSelectorItemsProps
} from "@/components/TagSelector/tag-selector.types";
import S from "./TagSelector.style";

function TagSelectorItem(p: TagSelectorItemProps) {
	const hasParent = p.tag.parent_id !== null;
	const isSelected = p.tagSelection?.[+p.tag.tag_id] ?? false;

	return (
		<S.ListItem
			$hasParent={hasParent}
			$isSelected={isSelected}
			key={p.tag.tag_id}
			onClick={() => p.updateTagSelection(+p.tag.tag_id)}
		>
			{p.tag.name}
		</S.ListItem>
	);
}

function TagSelectorItems(p: TagSelectorItemsProps) {
	return p.tags.map((tag) => (
		<TagSelectorItem
			tagSelection={p.tagSelection}
			updateTagSelection={p.updateTagSelection}
			key={tag.tag_id}
			tag={tag}
		/>
	));
}

export default TagSelectorItems;
