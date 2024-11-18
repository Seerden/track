import type { TagWithIds } from "@t/data/tag.types";
import type { ById } from "@t/data/utility.types";
import type { FocusEvent, MouseEvent } from "react";

// These are passed from TagSelector > TagSelectorItems > TagSelectorItem
export type SubcomponentProps = {
	tagSelection: Record<number, boolean>;
	updateTagSelection: (id: number) => void;
};

export type TagSelectorItemProps = SubcomponentProps & {
	tag: TagWithIds;
};

export type TagSelectorItemsProps = SubcomponentProps & {
	tags: TagWithIds[];
	modalId: string;
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
	tagsById?: ById<TagWithIds>;
	fullSize?: boolean;
	maximum?: number;
	showNewTagButton?: boolean;
	/** The modalId that gets passed to `NewTagButton` */
	modalId: string;
};
