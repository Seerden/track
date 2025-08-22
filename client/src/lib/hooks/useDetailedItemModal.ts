import type { ID } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { useAtom } from "jotai";
import type { ModalId } from "@/lib/modal-ids";
import type { ActiveItemState } from "@/lib/state/active-item-state";
import { activeItemAtom } from "@/lib/state/active-item-state";
import { useModalState } from "@/lib/state/modal-state";

/**
 * This hook provides an abstraction for Detail modals that currently supports
 * `Detailed[Activity, Tag, Habit]`. This hook provides a consistent way to tie
 * `activeItemState` to the modal state for these components.
 */
export default function useDetailedItemModal(
	type: keyof ActiveItemState,
	modalId: ModalId
) {
	const [activeItem, setActiveItem] = useAtom(activeItemAtom);
	const { openModal } = useModalState();

	function openDetailedItemModal(id: ID) {
		setActiveItem(
			produce((draft) => {
				draft[type].activeId = id;
			})
		);

		openModal(modalId);
	}

	return {
		modalId,
		activeItem,
		openDetailedItemModal,
	} as const;
}
