import { useModalState } from "@/lib/state/modal-state";
import { RefObject, useEffect } from "react";

type UseModalProps = {
	keys?: string[];
	outsideClickHandler?: (e: MouseEvent) => void; // TODO: I'm not sure if this will ever be used
	modalId: string;
	initialOpen?: boolean;
};

export default function useModal(
	modalRef: RefObject<HTMLElement | null>,
	{ keys, outsideClickHandler, modalId, initialOpen }: UseModalProps,
) {
	const { state, setModalOpen, toggleModal } = useModalState(modalId, initialOpen);

	function closeModal() {
		setModalOpen(false);
		window.removeEventListener("click", onClickOutside);
	}

	function onKeydown(e: KeyboardEvent) {
		console.log("TRYING TO CLOSE");
		console.log({ stateInKeyDown: state });
		if (
			state.isOpen &&
			modalRef.current &&
			["Escape"].concat(keys ?? []).includes(e.code)
		) {
			closeModal();
		}
	}

	function onClickOutside(e: MouseEvent) {
		if (!state.isOpen) {
			return;
		}

		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			console.log({ ref: modalRef.current, target: e.target });
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
