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
	{ keys, outsideClickHandler, modalId, initialOpen }: UseModalProps,
) {
	const { state, setModalOpen } = useModalState(modalId, initialOpen);

	function closeModal() {
		setModalOpen(false);
		window.removeEventListener("click", onClickOutside);
	}

	function onKeydown(e: KeyboardEvent) {
		if (
			state.isOpen &&
			modalRef.current &&
			["Escape"].concat(keys ?? []).includes(e.code)
		) {
			closeModal();
		}
	}

	function onClickOutside(e: MouseEvent) {
		if (!state.isOpen) return;

		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			e.preventDefault();
			e.stopPropagation();
			outsideClickHandler?.(e) ?? closeModal();
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", onKeydown);
		window.addEventListener("click", onClickOutside);

		return () => {
			window.removeEventListener("keydown", onKeydown);
			window.removeEventListener("click", onClickOutside);
		};
	}, []);

	return { isOpen: state.isOpen, closeModal };
}
