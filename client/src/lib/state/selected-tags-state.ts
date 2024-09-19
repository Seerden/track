import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
} from "recoil";
import type { ById, ID } from "../../types/server/utility.types";

export const tagSelectionState = atom<ById<boolean>>({
	default: {},
	key: "selectedTags",
});

export const selectedTagIdsSelector = selector({
	get: ({ get }) => {
		const selectedTags = get(tagSelectionState);
		return Object.keys(selectedTags)
			.filter((tagId) => selectedTags[+tagId])
			.map((id) => +id);
	},
	key: "selectedTagIds",
});

export function useTagSelection() {
	const [tagSelection, setTagSelection] = useRecoilState(tagSelectionState);
	const resetTagSelection = useResetRecoilState(tagSelectionState);
	const selectedTagIds = useRecoilValue(selectedTagIdsSelector);

	function toggleTagSelection(tag_id: ID) {
		setTagSelection((current) => {
			return { ...current, [tag_id]: !current[tag_id] };
		});
	}

	return {
		tagSelection,
		toggleTagSelection,
		selectedTagIds,
		setTagSelection,
		resetTagSelection,
	};
}
