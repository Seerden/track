import type { ModalId } from "@/lib/modal-ids";
import { activeItemAtom } from "@/lib/state/active-item-state";
import { produce } from "immer";
import { atom, useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";

const modalAtom = atom<ModalId[]>([]);

export function useModalState() {
	const [modalIds, setModalIds] = useAtom(modalAtom);
	const setActiveItem = useSetAtom(activeItemAtom);

	function maybeClearActiveItemState(modalId: ModalId) {
		if (!modalId.includes("detailed")) return;

		setActiveItem((current) => ({
			...current,
			[modalId.split("-")[1]]: {
				activeId: null
			}
		}));
	}

	function openModal(modalId: ModalId) {
		setModalIds(
			produce((current) => {
				if (!current.includes(modalId)) {
					console.log({ current });
					current.push(modalId);
				}
			})
		);
	}

	function closeModal(modalId: ModalId) {
		setModalIds((current) => current.filter((id) => id !== modalId));
		maybeClearActiveItemState(modalId);
	}

	function setModalOpen({ modalId, value }: { modalId: ModalId; value: boolean }) {
		if (!value) {
			closeModal(modalId);
		} else {
			setModalIds((current) => [...current, modalId]);
		}
	}

	const toggleModal = useCallback(
		(modalId: ModalId) => {
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
