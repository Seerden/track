import type { ById, ID } from "@shared/types/data/utility.types";
import {
	atom,
	atomFamily,
	selector,
	useRecoilState,
	useRecoilValue,
	useResetRecoilState
} from "recoil";

// TODO: we might want to use an atom famiy here to allow for multiple tag
// selection states
export const tagSelectionState = atom<ById<boolean>>({
	default: {},
	key: "selectedTags"
});

// TODO: this is WIP -- have to see if it works as I expect and also implement
// it for all current use-cases of the regular tagSelectionState. Also have to
// tweak selectedTagIdsSelector to use this atomFamily instead of the regular
// atom. See #64.
export const tagSelectionFamilyState = atomFamily<ById<boolean>, string>({
	key: "selectedTagsFamily",
	default: () => ({})
});

export const selectedTagIdsSelector = selector({
	get: ({ get }) => {
		const selectedTags = get(tagSelectionState);
		return Object.keys(selectedTags).filter((tagId) => selectedTags[tagId]);
	},
	key: "selectedTagIds"
});

export function useTagSelection() {
	const [tagSelection, setTagSelection] = useRecoilState(tagSelectionState);
	const resetTagSelection = useResetRecoilState(tagSelectionState);
	const selectedTagIds = useRecoilValue(selectedTagIdsSelector);

	function toggleTagSelection(tag_id: ID) {
		setTagSelection((current) => {
			return { ...current, [tag_id]: !current[tag_id] } as ById<boolean>;
		});
	}

	function setTagSelectionFromList(ids: ID[]) {
		const newSelection = ids.reduce((acc, id) => {
			acc[id] = true;
			return acc;
		}, {} as ById<boolean>);

		setTagSelection(newSelection);
	}

	return {
		tagSelection,
		toggleTagSelection,
		selectedTagIds,
		setTagSelection,
		resetTagSelection,
		setTagSelectionFromList
	};
}
