import { findNearestParentModal } from "@/lib/nearest-modal";
import type { RefObject } from "react";
import { useEffect, useState } from "react";

export default function useClickOutside<T extends HTMLElement | null>(
	ref: RefObject<T>,
	{
		handler,
		initialOpen = false,
	}: {
		initialOpen?: boolean;
		handler?: (e: MouseEvent) => void;
	} = {}
) {
	const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

	useEffect(() => {
		function onClick(e: MouseEvent) {
			if (!ref.current || ref.current.contains(e.target as Node)) {
				return;
			}

			// If the click is inside a modal, but not inside the modal that this
			// hook is attached to, don't trigger the handler.
			const nearestModalId = findNearestParentModal(e.target as Node);
			const parentModalId = findNearestParentModal(ref.current as Node);
			if (nearestModalId !== parentModalId) {
				return;
			}

			e.preventDefault();
			e.stopPropagation();
			handler?.(e);
			setIsOpen(false);
		}

		document.addEventListener("mousedown", onClick);

		return () => document.removeEventListener("mousedown", onClick);
	}, [ref, handler, setIsOpen]);

	return { isOpen, setIsOpen };
}
