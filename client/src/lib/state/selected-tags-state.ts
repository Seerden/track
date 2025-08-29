import type { ID } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { atom, useAtom } from "jotai";

/** Tag selection states are split up by usecase, using a unique identifier for
 * each usecase (examples: tag selection for a new activity; tag selection for
 * the activity overview). */
export type TagSelectionState = Map<string, ID[]>;

const tagSelectionAtom = atom<TagSelectionState>(new Map());

export function useTagSelection(id: string) {
	const [tagSelection, setTagSelection] = useAtom(tagSelectionAtom);
	const selectedTagIds = Array.from(tagSelection.get(id) ?? []);

	function toggleTagSelection(tagId: ID) {
		console.log("toggling", tagId);
		setTagSelection(
			produce((state) => {
				if (!state.has(id)) {
					state.set(id, []);
				}

				if (!state.get(id)?.includes(tagId)) {
					state.get(id)?.push(tagId);
				} else {
					state.set(id, state.get(id)?.filter((t) => t !== tagId) ?? []);
				}
			})
		);
	}

	function resetTagSelection() {
		setTagSelection(
			produce((draft) => {
				draft.set(id, []);
			})
		);
	}

	function setTagSelectionFromList(ids: ID[]) {
		setTagSelection(
			produce((draft) => {
				draft.set(id, ids);
			})
		);
	}

	return {
		tagSelection,
		selectedTagIds,
		toggleTagSelection,
		setTagSelection,
		resetTagSelection,
		setTagSelectionFromList,
	};
}
