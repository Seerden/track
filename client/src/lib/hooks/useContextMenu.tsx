import { Popover } from "@mantine/core";
import { produce } from "immer";
import { atom, useSetAtom } from "jotai";
import {
	cloneElement,
	isValidElement,
	useCallback,
	useEffect,
	useRef,
	type PropsWithChildren,
	type ReactElement,
	type ReactNode,
	type RefAttributes,
} from "react";
import { useToggle } from "./useToggle";

// maps key code -> label
export const shortcutMenuAtom = atom<Map<string, string[]>>(new Map());

function useShortcutMenu({ keys, label }: { keys: string[]; label: string }) {
	const setShortcutMenu = useSetAtom(shortcutMenuAtom);

	const registerShortcuts = useCallback(() => {
		setShortcutMenu(
			produce((draft) => {
				for (const key of keys) {
					if (draft.has(key)) {
						// ensures each label only gets registered once
						if (draft.get(key)?.includes(label)) continue;
						draft.set(key, [...(draft.get(key) ?? []), label]);
					} else {
						draft.set(key, [label]);
					}
				}
			})
		);
	}, [keys, label, setShortcutMenu]);

	function unregisterShortcuts() {
		setShortcutMenu(
			produce((draft) => {
				for (const key of keys) {
					if (draft.has(key)) {
						const value = draft.get(key);
						if (value?.length === 1 && value[0] === label) {
							draft.delete(key);
						} else {
							draft.set(key, value?.filter((l) => l !== label) ?? []);
						}
					}
				}
			})
		);
	}

	return { registerShortcuts, unregisterShortcuts };
}

function useContextMenu({ triggerKeys }: { triggerKeys: string[] }) {
	const [[focus, setFocus]] = useToggle(false);
	const [[hover, setHover]] = useToggle(false);
	const [[showMenu, setShowMenu], toggleShowMenu] = useToggle(false);

	// TODO (TRK-76): I thought I'd need the `ref` for the this ContextMenu to
	// work, but it's actually not necessary (at least, not yet). I'll keep it in
	// for if I want more complex behavior later that might require it.
	const ref = useRef<HTMLElement>(null);

	const keyListener = useCallback(
		(e: KeyboardEvent) => {
			if (!!ref.current && triggerKeys.includes(e.key) && (focus || hover)) {
				e.preventDefault();
				toggleShowMenu();
			}
		},
		[focus, hover, toggleShowMenu]
	);

	useEffect(() => {
		window.addEventListener("keydown", keyListener);
		return () => {
			window.removeEventListener("keydown", keyListener);
		};
	}, [keyListener]);

	const eventHandlers = {
		onMouseEnter: () => {
			setHover(true);
		},
		onMouseLeave: () => {
			setHover(false);
		},
		onFocus: () => {
			setFocus(true);
		},
		onBlur: () => {
			setFocus(false);
		},
	} as const;

	return {
		ref,
		eventHandlers,
		showMenu,
		setShowMenu,
	};
}

export function ContextMenu({
	/** This component expects 2 children: a trigger, and the thing that is
	 * rendered when the trigger is triggered. Trigger the trigger by hovering or
	 * focusing the trigger element and pressing any of the supplied
	 * triggerKeys or combinations.
	 */
	children,
	triggerKeys,
	label,
}: PropsWithChildren<{
	children: ReactNode;
	triggerKeys: string[];
	label: string;
}>) {
	const { eventHandlers, ref, showMenu, setShowMenu } = useContextMenu({
		triggerKeys,
	});
	const { registerShortcuts, unregisterShortcuts } = useShortcutMenu({
		keys: triggerKeys,
		label,
	});

	// TODO: a performance optimization would be to only register this if they
	// weren't already registered (right now, every ContextMenu instance, which
	// could be many, registers the same shortcuts). Example: each
	// HabitEntrySlider registers the same shortcuts. We could lift it out, but
	// that would requiring the context menu props to be passed down from
	// somewhere (to keep them in sync), or at least be in a variable somewhere.
	useEffect(() => {
		registerShortcuts();
		return () => {
			unregisterShortcuts();
		};
	}, []);

	if (!Array.isArray(children)) {
		throw new Error("ContextMenu children must be an array of React elements.");
	}

	if (children.length !== 2) {
		throw new Error(
			"ContextMenu must have exactly two children: a trigger and a triggerable."
		);
	}

	const withHandlers = !Array.isArray(children)
		? (cloneElement(children as ReactElement<RefAttributes<HTMLElement>>, {
				ref,
				...eventHandlers,
			}) as ReactElement<RefAttributes<HTMLElement>>)
		: children?.reduce(
				(acc, child: ReactElement<RefAttributes<HTMLElement>>, index) => {
					if (!isValidElement(child)) {
						throw new Error(
							"ContextMenu children must be valid React elements"
						);
					}

					acc.push(
						index === 0
							? cloneElement(child, {
									key: index,
									ref,
									...eventHandlers,
								})
							: child
					);

					return acc;
				},
				[] as ReactElement<RefAttributes<HTMLElement>>[]
			);

	if (!Array.isArray(children)) {
		return <>{withHandlers}</>;
	}
	const [first, ...rest] = withHandlers;

	return (
		<>
			<Popover
				onOpen={() => {
					// TODO (TRK-256): close all other context menus (or only of the
					// same kind?) could do it by tracking context menu state; then
					// first closing all the ones that we want, and then opening this
					// one.
				}}
				opened={showMenu}
				onDismiss={() => setShowMenu(false)}
				withinPortal={false}
				withArrow
				closeOnClickOutside>
				<Popover.Target>{first}</Popover.Target>
				<Popover.Dropdown>{rest}</Popover.Dropdown>
			</Popover>
		</>
	);
}
