import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { ID } from "../../types/server/utility.types";

export const selectedTagsState = atom<Record<ID, boolean>>({
	default: {},
	key: "selectedTags",
});

export const selectedTagIdsSelector = selector({
	get: ({ get }) => {
		const selectedTags = get(selectedTagsState);
		return Object.keys(selectedTags)
			.filter((tagId) => selectedTags[+tagId])
			.map((id) => +id);
	},
	key: "selectedTagIds",
});

export function useSelectedTags() {
	const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
	const selectedTagIds = useRecoilValue(selectedTagIdsSelector);

	function toggleTagSelection(tag_id: ID) {
		setSelectedTags((current) => {
			return { ...current, [tag_id]: !current[tag_id] };
		});
	}

	return {
		selectedTags,
		toggleTagSelection,
		selectedTagIds,
		setSelectedTags,
	};
}
