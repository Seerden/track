import type { ActiveItemState } from "@/lib/state/active-item-state";
import { activeItemState } from "@/lib/state/active-item-state";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

const modalIdsState = atom<string[]>({
	key: "modalIdsState",
	default: []
});

export function useModalState() {
	const [modalIds, setModalIds] = useRecoilState(modalIdsState);
	const setActiveItem = useSetRecoilState(activeItemState);

	function possiblyResetActiveItemState(modalId: string) {
		if (!modalId.includes("detailed")) return;
		// TODO: need to do some validation on `type` below:
		const type = modalId.split("-")[1] as keyof ActiveItemState;

		setActiveItem((current) => ({
			...current,
			[type]: {
				shouldShowModal: false,
				activeId: null,
				activeItem: null
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
		possiblyResetActiveItemState(modalId);
		setModalIds((current) => current.filter((id) => id !== modalId));
	}

	function setModalOpen({ modalId, value }: { modalId: string; value: boolean }) {
		possiblyResetActiveItemState(modalId);
		setModalIds((current) =>
			value ? [...current, modalId] : current.filter((id) => id !== modalId)
		);
	}

	function toggleModal(modalId: string) {
		setModalIds((current) =>
			current.includes(modalId)
				? current.filter((id) => id !== modalId)
				: [...current, modalId]
		);

		// TODO: if toggled off, possiblyResetActiveItemState(modalId);
	}

	return {
		modalIds,
		setModalIds,
		closeModal,
		openModal,
		setModalOpen,
		toggleModal
	};
}
