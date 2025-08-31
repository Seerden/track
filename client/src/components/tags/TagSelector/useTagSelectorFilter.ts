import useClickOutside from "@lib/hooks/useClickOutside";
import type { FocusEvent, MouseEvent } from "react";
import { useRef } from "react";

export default function useTagSelectorFilter() {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { isOpen: expanded, setIsOpen: setExpanded } =
		useClickOutside(dropdownRef);

	function expandFilter<T>(e?: MouseEvent<T> | FocusEvent<T>) {
		e?.stopPropagation();
		setExpanded(true);
	}

	function minimizeFilter<T>(e?: MouseEvent<T> | FocusEvent<T>) {
		e?.stopPropagation();
		setExpanded(false);
	}

	return {
		dropdownRef,
		expanded,
		expandFilter,
		minimizeFilter,
	};
}
