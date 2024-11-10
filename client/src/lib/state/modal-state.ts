import { atom, useRecoilState } from "recoil";

const modalIdsState = atom<string[]>({
	key: "modalIdsState",
	default: []
});

export function useModalState() {
	const [modalIds, setModalIds] = useRecoilState(modalIdsState);

	function openModal(modalId: string) {
		setModalIds((current) => {
			if (current.includes(modalId)) return current;
			return [...current, modalId];
		});
	}

	function closeModal(modalId: string) {
		setModalIds((current) => current.filter((id) => id !== modalId));
	}

	function setModalOpen({ modalId, value }: { modalId: string; value: boolean }) {
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
