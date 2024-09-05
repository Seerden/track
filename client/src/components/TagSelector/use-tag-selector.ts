import { useEffect, useState } from "react";
import { ID } from "../../types/server/utility.types";

type UseTagSelector = {
	maximum?: number;
};

export default function useTagSelector({ maximum }: UseTagSelector = {}) {
	const [tagSelection, setTagSelection] = useState<Record<ID, boolean>>({});
	const [filter, setFilter] = useState<string>("");

	function updateFilter(e: React.ChangeEvent<HTMLInputElement>) {
		setFilter(e.target.value);
	}

	function updateTagSelection(tagId: ID) {
		if (maximum === 1) {
			return setTagSelection({ [tagId]: !tagSelection[tagId] });
		}

		return setTagSelection((cur) => ({ ...cur, [tagId]: !cur[tagId] }));
	}

	// TODO: remove this
	useEffect(() => {
		console.log({ tagSelection });
	}, [tagSelection]);

	return {
		tagSelection,
		updateTagSelection,
		filter,
		updateFilter,
	};
}
