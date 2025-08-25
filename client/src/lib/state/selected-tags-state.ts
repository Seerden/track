import type { ID } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { atom, useAtom } from "jotai";

/** Tag selection states are split up by usecase, using a unique identifier for
 * each usecase (examples: tag selection for a new activity; tag selection for
 * the activity overview). */
export type TagSelectionState = Map<string, Set<ID>>;

const tagSelectionAtom = atom<TagSelectionState>(new Map());

export function useTagSelection(id: string) {
	const [tagSelection, setTagSelection] = useAtom(tagSelectionAtom);
	const selectedTagIds = Array.from(tagSelection.get(id) ?? []);

	function toggleTagSelection(tagId: ID) {
		console.log("toggling", tagId);
		setTagSelection(
			produce((state) => {
				if (!state.has(id)) {
					state.set(id, new Set());
				}

				if (!state.get(id)?.has(tagId)) {
					state.get(id)?.add(tagId);
				} else {
					state.get(id)?.delete(tagId);
				}
			})
		);
	}

	function resetTagSelection() {
		setTagSelection(
			produce((draft) => {
				draft.set(id, new Set());
			})
		);
	}

	function setTagSelectionFromList(ids: ID[]) {
		setTagSelection(
			produce((draft) => {
				draft.set(id, new Set(ids));
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
