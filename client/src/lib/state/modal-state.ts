import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

const modalIdsState = atom<string[]>({
	key: "modalIdsState",
	default: []
});

export function useModalState() {
	const [modalIds, setModalIds] = useRecoilState(modalIdsState);

	useEffect(() => {
		if (modalIds.length) {
			console.log({ modalIds });
		}
	}, [modalIds]);

	function openModal(modalId: string) {
		setModalIds((current) => {
			if (current.includes(modalId)) return current;
			return [...current, modalId];
		});
	}

	function closeModal(modalId: string) {
		setModalIds((current) => current.filter((id) => id !== modalId));
	}

	// TODO: currently unused, but could come in useful when we make modals
	// thatdo not cover the entire screen
	function closeModalAndDescendants(modalId: string) {
		setModalIds((current) => {
			const index = current.indexOf(modalId);
			return current.slice(0, index);
		});
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
		toggleModal,
		closeModalAndDescendants
	};
}

export const modalCountState = atom<number>({
	default: 0,
	key: "modalCountState"
});
