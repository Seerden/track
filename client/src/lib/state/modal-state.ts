import type { ID } from "@/types/server/utility.types";
import { atomFamily, useRecoilState } from "recoil";

type ModalState = {
	isOpen: boolean;
	itemType?: string;
	itemId?: ID;
};

type ModalStateParams = {
	modalId: string;
	initialOpen?: boolean;
};

export const modalStateFamily = atomFamily<ModalState, ModalStateParams>({
	key: "modalStateFamily",
	default: (params) => ({
		modalId: params.modalId,
		isOpen: params.initialOpen ?? false,
	}),
});

export function useModalState(modalId: string) {
	const [state, setModalState] = useRecoilState(modalStateFamily({ modalId }));

	function openModal() {
		setModalState((current) => ({ ...current, isOpen: true }));
	}

	function closeModal() {
		setModalState((current) => ({ ...current, isOpen: false }));
	}

	function setModalOpen(value: boolean) {
		setModalState((current) => ({ ...current, isOpen: value }));
	}

	function toggleModal() {
		setModalState((current) => ({ ...current, isOpen: !current.isOpen }));
	}

	function setModalItemId(itemId: ID) {
		setModalState((current) => ({ ...current, itemId }));
	}

	return {
		state,
		closeModal,
		openModal,
		setModalOpen,
		toggleModal,
		setModalItemId,
		setModalState,
	};
}
