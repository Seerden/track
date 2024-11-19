import type { ActiveItemState } from "@/lib/state/active-item-state";
import { activeItemState } from "@/lib/state/active-item-state";
import { useModalState } from "@/lib/state/modal-state";
import type { ID } from "@t/data/utility.types";
import { useRecoilState } from "recoil";

export default function useDetailedItemModal(
	type: keyof ActiveItemState,
	modalId: string
) {
	const [activeItem, setActiveItem] = useRecoilState(activeItemState);
	const { openModal, closeModal } = useModalState();

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
