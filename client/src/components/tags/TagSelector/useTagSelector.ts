import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import { useTagSelection } from "@lib/state/selected-tags-state";
import { byIdAsList } from "@shared/lib/map";
import type { TagsInTree } from "@shared/lib/schemas/tag";
import type { ById, ID } from "@shared/types/data/utility.types";
import type { ChangeEvent, MouseEvent } from "react";
import { useMemo, useState } from "react";

type UseTagSelector = {
	maximum?: number;
	tags?: TagsInTree;
};

// TODO: handle case where maximum > 1.
export default function useTagSelector({
	maximum,
	tags: initialTags
}: UseTagSelector = {}) {
	const { data: tags } = useQueryTags();

	const {
		tagSelection,
		setTagSelection,
		toggleTagSelection,
		selectedTagIds,
		resetTagSelection
	} = useTagSelection();
	const [filter, setFilter] = useState<string>("");

	function updateFilter(e: ChangeEvent<HTMLInputElement>) {
		setFilter(e.target.value);
	}

	function clearFilter(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		setFilter("");
	}

	function updateTagSelection(tagId: ID) {
		if (maximum === 1) {
			setTagSelection((current) => ({ [tagId]: !current[tagId] }) as ById<boolean>);
		} else {
			toggleTagSelection(tagId);
		}
	}

	function onSelectionReset(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		resetTagSelection();
	}

	// TODO: If tags are passed through props (=p.tagsById), they take priority over all the
	// user's tags (=t.tags.tags), We need to rename the variables to make that clear.
	const tagList = byIdAsList(initialTags ?? tags);
	const tagsToDisplay = tagList.filter((tag) =>
		tag.name.toLowerCase().includes(filter.toLowerCase())
	);
	const selectedTags = useMemo(
		() => tagList.filter((tag) => selectedTagIds.includes(tag.tag_id)),
		[tags, selectedTagIds]
	);

	return {
		tagSelection,
		updateTagSelection,
		filter,
		updateFilter,
		clearFilter,
		selectedTagIds,
		resetTagSelection,
		onSelectionReset,
		tagsToDisplay,
		selectedTags,
		tags: tagList
	};
}
