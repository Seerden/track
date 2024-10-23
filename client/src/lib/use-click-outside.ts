import type { RefObject } from "react";
import { useEffect, useState } from "react";

export default function useClickOutside<T extends HTMLElement>(
	ref: RefObject<T>,
	{
		handler,
		initialOpen = false,
	}: {
		initialOpen?: boolean;
		handler?: (e: MouseEvent) => void;
	} = {},
) {
	const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

	useEffect(() => {
		function onClick(e: MouseEvent) {
			if (!ref.current || ref.current.contains(e.target as Node)) {
				return;
			}

			e.preventDefault();
			e.stopPropagation();
			handler?.(e);
			setIsOpen(false);
		}

		window.addEventListener("click", onClick);

		return () => window.removeEventListener("click", onClick);
	}, [ref, handler, setIsOpen]);

	return { isOpen, setIsOpen };
}
