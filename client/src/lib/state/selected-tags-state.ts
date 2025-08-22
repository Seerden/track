import type { ById, ID } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { atom, useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";

interface TagSelectionState {
	tagSelection: ById<boolean>;
	selectedTagIds: ID[];
	toggleTagSelection: (tag_id: ID) => void;
	setTagSelection: (selection: ById<boolean>) => void;
	resetTagSelection: () => void;
	setTagSelectionFromList: (ids: ID[]) => void;
}

const tagSelectionAtom = atom<TagSelectionState["tagSelection"]>({});

const selectedTagIdsAtom = atom((get) => {
	const tagSelection = get(tagSelectionAtom);
	return Object.keys(tagSelection).filter((tagId) => tagSelection[tagId]);
});

export function useTagSelection() {
	const selectedTagIds = useAtomValue(selectedTagIdsAtom);
	const [tagSelection, setTagSelection] = useAtom(tagSelectionAtom);

	const toggleTagSelection = useCallback(
		(tag_id: ID) => {
			setTagSelection(
				produce((state) => {
					state[tag_id] = !state[tag_id];
				})
			);
		},
		[setTagSelection]
	);

	const resetTagSelection = () => setTagSelection({});

	const setTagSelectionFromList = (ids: ID[]) => {
		const newSelection = ids.reduce(
			(acc, id) => {
				acc[id] = true;
				return acc;
			},
			{} as ById<boolean>
		);
		setTagSelection(newSelection);
	};

	return {
		tagSelection,
		selectedTagIds,
		toggleTagSelection,
		setTagSelection,
		resetTagSelection,
		setTagSelectionFromList,
	};
}
