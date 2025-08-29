import type { TagsInTree, TagWithIds } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";
import type { FocusEvent, MouseEvent } from "react";
import type { ModalId } from "@/lib/modal-ids";
import type { TagSelectionState } from "@/lib/state/selected-tags-state";

// These are passed from TagSelector > TagSelectorItems > TagSelectorItem
export type SubcomponentProps = {
	tagSelection: TagSelectionState;
	updateTagSelection: (id: ID) => void;
};

export type TagSelectorItemProps = SubcomponentProps & {
	tag: TagWithIds;
};

export type TagSelectorItemsProps = SubcomponentProps & {
	filteredTags: TagWithIds[];
	modalId: ModalId;
};

export type FilterProps = {
	filter: string;
	updateFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
	clearFilter: (e: MouseEvent<HTMLButtonElement>) => void;
	onFocus?: <T>(e?: FocusEvent<T>) => void;
	hasAutoFocus?: boolean;
};

export type SelectionProps = {
	selectedTags: TagWithIds[];
	tags: TagWithIds[];
	fullPaths?: boolean;
};

export type TagSelectorProps = {
	/** id for tag selection state */
	tagSelectorId: string;
	title?: string;
	tags?: TagsInTree;
	fullSize?: boolean;
	maximum?: number;
	showNewTagButton?: boolean;
	/** The modalId that gets passed to `NewTagButton` */
	modalId: ModalId;
};
