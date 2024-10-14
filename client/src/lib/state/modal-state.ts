import { ID } from "@/types/server/utility.types";
import { atomFamily, useRecoilValue, useSetRecoilState } from "recoil";

export const modalStateFamily = atomFamily<
	{
		isOpen: boolean;
		itemType?: string;
		itemId?: ID;
	},
	{ modalId: string; initialOpen?: boolean }
>({
	key: "modalStateFamily",
	default: (params) => ({
		isOpen: params.initialOpen ?? false,
		modalId: params.modalId,
	}),
});

export function useModalState(modalId: string, initialOpen?: boolean) {
	const modalState = useRecoilValue(modalStateFamily({ modalId, initialOpen }));
	const setModalState = useSetRecoilState(modalStateFamily({ modalId, initialOpen }));

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
		state: modalState,
		closeModal,
		openModal,
		setModalOpen,
		toggleModal,
		setModalItemId,
		setModalState,
	};
}
