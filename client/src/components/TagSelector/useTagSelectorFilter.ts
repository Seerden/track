import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import useClickOutside from "@/lib/useClickOutside";
import type { FocusEvent, MouseEvent } from "react";
import { useRef } from "react";

export default function useTagSelectorFilter(modalId: string) {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { isOpen: expanded, setIsOpen: setExpanded } = useClickOutside(dropdownRef);
	const tagTreeModalId = `${modalIds.tagTree.tagSelector}-${modalId}`;

	const { openModal } = useModalState(tagTreeModalId);

	function expandFilter<T>(e?: MouseEvent<T> | FocusEvent<T>) {
		e?.stopPropagation();
		setExpanded(true);
	}

	function minimizeFilter(e: MouseEvent) {
		e.stopPropagation();
		setExpanded(false);
	}

	return {
		dropdownRef,
		expanded,
		setExpanded,
		expandFilter,
		minimizeFilter
	};
}
