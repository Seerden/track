import { useModalState } from "@/lib/state/modal-state";
import type { RefObject } from "react";
import { useCallback, useEffect } from "react";

type UseModalProps = {
	keys?: string[];
	modalId: string;
	initialOpen?: boolean;
};

export default function useModal(
	modalRef: RefObject<HTMLElement | null>,
	{ keys, modalId, initialOpen }: UseModalProps
) {
	const { setModalOpen, modalIds } = useModalState();

	useEffect(() => {
		if (initialOpen) {
			setModalOpen({ modalId, value: true });
		}
	}, []);

	function closeModal(modalId: string) {
		setModalOpen({ modalId, value: false });
		window.removeEventListener("keydown", onKeydown);
	}

	const isOpen = modalIds.includes(modalId);

	const onKeydown = useCallback(
		(e: KeyboardEvent) => {
			if (
				modalIds.length &&
				modalRef.current &&
				["Escape"].concat(keys ?? []).includes(e.code)
			) {
				// -- since we check for modalIds.length, modalIds.at(-1) will always be defined
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				closeModal(modalIds.at(-1)!);
			}
		},
		[modalIds]
	);

	useEffect(() => {
		if (!isOpen) return;

		window.addEventListener("keydown", onKeydown);

		return () => {
			window.removeEventListener("keydown", onKeydown);
		};
	}, [isOpen]);

	return { isOpen, closeModal };
}
