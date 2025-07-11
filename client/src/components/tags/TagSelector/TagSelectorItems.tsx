import type {
	TagSelectorItemProps,
	TagSelectorItemsProps
} from "@/components/tags/TagSelector/tag-selector.types";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
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
function TagSelectorItems(p: TagSelectorItemsProps) {
	const { openModal } = useModalState();
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());

	if (!tagsData?.byId) return null;

	const tagIds = [...tagsData.byId.keys()];
	const hasTags = tagIds.length > 0;

	if (hasTags && p.tags.length === 0) {
		return <p>No tags found for selected filter.</p>;
	}

	if (tagIds.length === 0)
		return (
			<button
				type="button"
				onClick={(e) => {
					openModal(p.modalId);
					e.stopPropagation();
				}}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					width: "100%",
					justifyContent: "center",
					textDecoration: "underline",
					backgroundColor: "dodgerblue",
					color: "white",
					border: "none",
					alignItems: "center",
					padding: "0.5rem",
					height: "max-content"
				}}
			>
				You do not have any tags yet. Click to add one.
			</button>
		);

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
