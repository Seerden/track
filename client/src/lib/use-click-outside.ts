import { useEffect, useState } from "react";

type UseClickOutside<T extends HTMLElement> = {
	ref: React.RefObject<T>;
	initialOpen?: boolean;
	handler?: (e: MouseEvent) => void;
};

export default function useClickOutside<T extends HTMLElement>({
	ref,
	handler,
	initialOpen = false,
}: UseClickOutside<T>) {
	const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

	useEffect(() => {
		function onMousedown(event: MouseEvent) {
			if (!ref.current || ref.current.contains(event.target as Node)) return;
			handler?.(event);
			setIsOpen(false);
		}

		window.addEventListener("mousedown", onMousedown);

		return () => {
			window.removeEventListener("mousedown", onMousedown);
		};
	}, [ref, handler]);

	return { isOpen, setIsOpen };
}
