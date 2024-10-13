import { ID } from "@/types/server/utility.types";
import {
	atomFamily,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from "recoil";

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
	const closeModal = useResetRecoilState(modalStateFamily({ modalId, initialOpen }));
	const setModalState = useSetRecoilState(modalStateFamily({ modalId, initialOpen }));

	function setModalOpen(value: boolean) {
		setModalState({ isOpen: value });
	}

	function openModal() {
		setModalState({ isOpen: true });
	}

	function toggleModal() {
		setModalState((current) => ({ isOpen: !current.isOpen }));
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
