import useTagsQuery from "@/lib/query/useTagsQuery";
import type { TagWithIds } from "@/types/server/tag.types";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { ById, ID } from "@type/server/utility.types";
import type { ChangeEvent, MouseEvent } from "react";
import { useMemo, useState } from "react";

type UseTagSelector = {
	maximum?: number;
	tagsById?: ById<TagWithIds>;
};

// TODO: handle case where maximum > 1.
export default function useTagSelector({ maximum, tagsById }: UseTagSelector = {}) {
	const { data: tagsData } = useTagsQuery();

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
			setTagSelection((current) => ({ [tagId]: !current[tagId] }));
		} else {
			toggleTagSelection(tagId);
		}
	}

	function onSelectionReset(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		resetTagSelection();
	}

	// TODO: If tags are passed through props (=p.tagsById), they take priority over all the
	// user's tags (=t.tags.tagsById), We need to rename the variables to make that clear.
	const tags = Object.values(tagsById ?? tagsData?.tagsById ?? []);
	const tagsToDisplay = tags.filter((tag) =>
		tag.name.toLowerCase().includes(filter.toLowerCase())
	);
	const selectedTags = useMemo(
		() => tags.filter((tag) => selectedTagIds.includes(tag.tag_id)),
		[tagsData, selectedTagIds]
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
		tags
	};
}
