import { useModalState } from "@/lib/state/modal-state";
import type { RefObject } from "react";
import { useEffect } from "react";

type UseModalProps = {
	keys?: string[];
	outsideClickHandler?: (e: MouseEvent) => void;
	modalId: string;
	initialOpen?: boolean;
};

export default function useModal(
	modalRef: RefObject<HTMLElement | null>,
	{ keys, outsideClickHandler, modalId, initialOpen }: UseModalProps
) {
	const { setModalOpen, modalIds } = useModalState();

	useEffect(() => {
		if (initialOpen) {
			setModalOpen({ modalId, value: true });
		}
	}, []);

	function closeModal(modalId: string) {
		setModalOpen({ modalId, value: false });
		window.removeEventListener("click", onClickOutside);
		window.removeEventListener("keydown", onKeydown);
	}

	function onKeydown(e: KeyboardEvent) {
		if (modalRef.current && ["Escape"].concat(keys ?? []).includes(e.code)) {
			closeModal(modalId);
		}
	}

	function onClickOutside(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			const idToClose = modalRef.current.dataset.modalId;
			if (!idToClose) return;
			outsideClickHandler?.(e) ?? closeModal(idToClose);
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", onKeydown);
		window.addEventListener("click", onClickOutside);

		return () => {
			window.removeEventListener("keydown", onKeydown);
			window.removeEventListener("click", onClickOutside);
		};
	}, [modalRef.current]);

	return { isOpen: modalIds.includes(modalId), closeModal };
}
