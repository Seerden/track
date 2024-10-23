import useTagsQuery from "@lib/query/use-tags-query";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { ID } from "@type/server/utility.types";
import type { MouseEvent } from "react";
import { useState } from "react";

type UseTagSelector = {
	maximum?: number;
};

// TODO: handle case where maximum > 1.
export default function useTagSelector({ maximum }: UseTagSelector = {}) {
	const { data: tags } = useTagsQuery();

	const {
		tagSelection,
		setTagSelection,
		toggleTagSelection,
		selectedTagIds,
		resetTagSelection,
	} = useTagSelection();
	const [filter, setFilter] = useState<string>("");

	function updateFilter(e: React.ChangeEvent<HTMLInputElement>) {
		setFilter(e.target.value);
	}

	function clearFilter(e: React.MouseEvent<HTMLButtonElement>) {
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

	function onResetSelection(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		resetTagSelection();
	}

	return {
		tagSelection,
		updateTagSelection,
		filter,
		updateFilter,
		clearFilter,
		tags,
		selectedTagIds,
		resetTagSelection,
		onResetSelection,
	};
}
