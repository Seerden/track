import { useState } from "react";
import { useTagSelection } from "../../lib/state/selected-tags-state";
import useTagsQuery from "../../lib/use-tags-query";
import { ID } from "../../types/server/utility.types";

type UseTagSelector = {
	maximum?: number;
};

// TODO: handle case where maximum > 1.
export default function useTagSelector({ maximum }: UseTagSelector = {}) {
	const { data: tags } = useTagsQuery();

	const { tagSelection, setTagSelection, toggleTagSelection } = useTagSelection();
	const [filter, setFilter] = useState<string>("");

	function updateFilter(e: React.ChangeEvent<HTMLInputElement>) {
		setFilter(e.target.value);
	}

	function updateTagSelection(tagId: ID) {
		if (maximum === 1) {
			setTagSelection((current) => ({ [tagId]: !current[tagId] }));
		} else {
			toggleTagSelection(tagId);
		}
	}

	return {
		tagSelection,
		updateTagSelection,
		filter,
		updateFilter,
		tags,
	};
}
