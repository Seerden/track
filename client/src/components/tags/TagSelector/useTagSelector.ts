import { trpc } from "@/lib/trpc";
import { useTagSelection } from "@lib/state/selected-tags-state";
import { byIdAsList } from "@shared/lib/map";
import type { TagWithIds } from "@shared/lib/schemas/tag";
import type { ById, ByIdMap, ID } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";
import type { ChangeEvent, MouseEvent } from "react";
import { useMemo, useState } from "react";

type UseTagSelector = {
	maximum?: number;
	tagsById?: ByIdMap<TagWithIds>;
};

// TODO: handle case where maximum > 1.
export default function useTagSelector({ maximum, tagsById }: UseTagSelector = {}) {
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());

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
	// user's tags (=t.tags.tagsById), We need to rename the variables to make that clear.
	const tags = byIdAsList(tagsById ?? tagsData?.byId);
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
