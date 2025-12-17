import { produce } from "immer";
import { atom, useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import type { ModalId } from "@/lib/modal-ids";
import { activeItemAtom } from "@/lib/state/active-item-state";

const modalAtom = atom<ModalId[]>([]);

export function useModalState() {
	const [modalIds, setModalIds] = useAtom(modalAtom);
	const setActiveItem = useSetAtom(activeItemAtom);

	function maybeClearActiveItemState(modalId: ModalId) {
		if (!modalId.includes("detailed")) return;

		setActiveItem((current) => ({
			...current,
			[modalId.split("-")[1]]: {
				activeId: null,
			},
		}));
	}

	function openModal(modalId: ModalId) {
		setModalIds(
			produce((current) => {
				if (!current.includes(modalId)) {
					current.push(modalId);
				}
			})
		);
	}

	function closeModal(modalId: ModalId) {
		setModalIds((current) => current.filter((id) => id !== modalId));
		maybeClearActiveItemState(modalId);
	}

	function setModalOpen({
		modalId,
		value,
	}: {
		modalId: ModalId;
		value: boolean;
	}) {
		if (!value) {
			closeModal(modalId);
		} else {
			setModalIds((current) => [...current, modalId]);
		}
	}

	const toggleModal = useCallback(
		(modalId: ModalId) => {
			const isOpen = modalIds.includes(modalId);
			if (isOpen) {
				closeModal(modalId);
			} else {
				openModal(modalId);
			}
		},
		[modalIds]
	);

	return {
		modalIds,
		setModalIds,
		closeModal,
		openModal,
		setModalOpen,
		toggleModal,
	};
}
