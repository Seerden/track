import { RefObject, useEffect, useState } from "react";

type UseModalProps = {
	keys?: string[];
	outsideClickHandler?: (e: MouseEvent) => void; // TODO: I'm not sure if this will ever be used
	initialOpen?: boolean;
};

export default function useModal(
	modalRef: RefObject<HTMLElement | null>,
	{ keys, outsideClickHandler, initialOpen }: UseModalProps = {
		keys: ["Escape"],
		initialOpen: false,
	},
) {
	const [isOpen, setIsOpen] = useState(initialOpen);

	function close() {
		setIsOpen(false);
		window.removeEventListener("click", onClickOutside);
	}

	function open() {
		setIsOpen(true);
	}

	function toggle() {
		setIsOpen((cur) => !cur);
	}

	function onKeydown(e: KeyboardEvent) {
		if (isOpen && modalRef.current && ["Escape"].concat(keys ?? []).includes(e.code)) {
			close();
		}
	}

	function onClickOutside(e: MouseEvent) {
		if (!isOpen) {
			return;
		}

		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			e.preventDefault();
			e.stopPropagation();
			outsideClickHandler?.(e) ?? close();
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

	return {
		open,
		close,
		toggle,
		isOpen,
	};
}
