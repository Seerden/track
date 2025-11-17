import { produce } from "immer";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

// TODO: group these by scope and get the scope-specific options inside the hook
export type PopoverId = "ActivityMenu" | "ProfileMenu";
export type PopoverScope = "header";

export const popoverAtom = atom<Map<PopoverScope, Set<PopoverId>>>(new Map());

export function usePopover(scope: PopoverScope) {
	const [popoverState, setPopoverState] = useAtom(popoverAtom);

	const openInScope = (scope: PopoverScope, id: PopoverId) => {
		// clear any other opened popover in scope, and open this one
		setPopoverState(
			produce((draft) => {
				draft.set(scope, new Set<PopoverId>([id]));
			})
		);
	};

	const isOpened = useCallback(
		(scope: PopoverScope, id: PopoverId) => {
			return popoverState.get(scope)?.has(id);
		},
		[popoverState]
	);

	const closeInScope = (scope: PopoverScope, id: PopoverId) => {
		setPopoverState(
			produce((draft) => {
				if (isOpened(scope, id)) {
					draft.set(scope, new Set());
				}
				// TODO?: could delete the scope if it's now empty.
			})
		);
	};

	const toggleInScope = (scope: PopoverScope, id: PopoverId) => {
		const scopeSet = popoverState.get(scope);
		if (scopeSet?.has(id)) {
			closeInScope(scope, id);
		} else {
			openInScope(scope, id);
		}
	};

	return {
		open: (id: PopoverId) => openInScope(scope, id),
		close: (id: PopoverId) => closeInScope(scope, id),
		toggle: (id: PopoverId) => toggleInScope(scope, id),
		opened: (id: PopoverId) => isOpened(scope, id),
	};
}
