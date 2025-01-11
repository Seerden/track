import type { ModalId } from "@/lib/modal-ids";
import type { TagWithIds } from "@shared/types/data/tag.types";
import type { ByIdMap, ID } from "@shared/types/data/utility.types";
import type { FocusEvent, MouseEvent } from "react";

// These are passed from TagSelector > TagSelectorItems > TagSelectorItem
export type SubcomponentProps = {
	tagSelection: Record<number, boolean>;
	updateTagSelection: (id: ID) => void;
};

export type TagSelectorItemProps = SubcomponentProps & {
	tag: TagWithIds;
};

export type TagSelectorItemsProps = SubcomponentProps & {
	tags: TagWithIds[];
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
	title?: string;
	tagsById?: ByIdMap<TagWithIds>;
	fullSize?: boolean;
	maximum?: number;
	showNewTagButton?: boolean;
	/** The modalId that gets passed to `NewTagButton` */
	modalId: ModalId;
};
