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
		function onClick(e: MouseEvent) {
			e.preventDefault();
			e.stopPropagation();

			if (!ref.current || ref.current.contains(e.target as Node)) return;

			handler?.(e);
			setIsOpen(false);
		}

		window.addEventListener("click", onClick);

		return () => window.removeEventListener("click", onClick);
	}, [ref, handler, setIsOpen]);

	return { isOpen, setIsOpen };
}
