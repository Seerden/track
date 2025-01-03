import type { ModalId } from "@/lib/modal-ids";
import type { ActiveItemState } from "@/lib/state/active-item-state";
import { activeItemState } from "@/lib/state/active-item-state";
import { useModalState } from "@/lib/state/modal-state";
import type { ID } from "@shared/types/data/utility.types";
import { useRecoilState } from "recoil";

/**
 * This hook provides an abstraction for Detail modals that currently supports
 * `Detailed[Activity, Tag, Habit]`. This hook provides a consistent way to tie
 * `activeItemState` to the modal state for these components.
 */
export default function useDetailedItemModal(
	type: keyof ActiveItemState,
	modalId: ModalId
) {
	const [activeItem, setActiveItem] = useRecoilState(activeItemState);
	const { openModal } = useModalState();

	function openDetailedItemModal(id: ID) {
		setActiveItem((current) => ({
			...current,
			[type]: {
				activeId: id
			}
		}));

		openModal(modalId);
	}

	return {
		modalId,
		activeItem,
		openDetailedItemModal
	} as const;
}
