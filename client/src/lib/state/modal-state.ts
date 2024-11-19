import { activeItemState } from "@/lib/state/active-item-state";
import { useCallback } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const modalIdsState = atom<string[]>({
	key: "modalIdsState",
	default: []
});

export function useModalState() {
	const [modalIds, setModalIds] = useRecoilState(modalIdsState);
	const setActiveItem = useSetRecoilState(activeItemState);

	function maybeClearActiveItemState(modalId: string) {
		if (!modalId.includes("detailed")) return;

		setActiveItem((current) => ({
			...current,
			[modalId.split("-")[1]]: {
				activeId: null
			}
		}));
	}

	function openModal(modalId: string) {
		setModalIds((current) => {
			if (current.includes(modalId)) return current;
			return [...current, modalId];
		});
	}

	function closeModal(modalId: string) {
		setModalIds((current) => current.filter((id) => id !== modalId));
		maybeClearActiveItemState(modalId);
	}

	function setModalOpen({ modalId, value }: { modalId: string; value: boolean }) {
		if (!value) {
			closeModal(modalId);
		} else {
			setModalIds((current) => [...current, modalId]);
		}
	}

	const toggleModal = useCallback(
		(modalId: string) => {
			// maybe clear active item state.
			const isOpen = modalIds.includes(modalId);
			const newValue = !isOpen;
			if (!newValue) {
				maybeClearActiveItemState(modalId);
			}

			// actually toggle the modal.
			setModalIds((current) =>
				current.includes(modalId)
					? current.filter((id) => id !== modalId)
					: [...current, modalId]
			);
		},
		[modalIds]
	);

	return {
		modalIds,
		setModalIds,
		closeModal,
		openModal,
		setModalOpen,
		toggleModal
	};
}
