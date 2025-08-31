import type { ID } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { atom, useAtom } from "jotai";

/** Tag selection states are split up by usecase, using a unique identifier for
 * each usecase (examples: tag selection for a new activity; tag selection for
 * the activity overview). */
export type TagSelectionState = Map<string, ID[]>;

const tagSelectionAtom = atom<TagSelectionState>(new Map());

export function useTagSelection(
	/** the selection id. Tag selection is split up into use-cases, e.g. the tags
	 * for a NewTag form are different to those for the highlighted tasks. */
	selectionId: string
) {
	const [tagSelection, setTagSelection] = useAtom(tagSelectionAtom);
	const selectedTagIds = Array.from(tagSelection.get(selectionId) ?? []);

	function toggleTagSelection(tagId: ID) {
		setTagSelection(
			produce((state) => {
				if (!state.has(selectionId)) {
					state.set(selectionId, []);
				}

				if (!state.get(selectionId)?.includes(tagId)) {
					state.get(selectionId)?.push(tagId);
				} else {
					state.set(
						selectionId,
						state.get(selectionId)?.filter((t) => t !== tagId) ?? []
					);
				}
			})
		);
	}

	function resetTagSelection() {
		setTagSelection(
			produce((draft) => {
				draft.set(selectionId, []);
			})
		);
	}

	function setTagSelectionFromList(ids: ID[]) {
		setTagSelection(
			produce((draft) => {
				draft.set(selectionId, ids);
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
