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

	const onKeydown = useCallback(
		(e: KeyboardEvent) => {
			if (
				modalIds.length &&
				modalRef.current &&
				["Escape"].concat(keys ?? []).includes(e.code)
			) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				closeModal(modalIds.at(-1)!);
			}
		},
		[modalIds]
	);

	useEffect(() => {
		if (!modalIds.includes(modalId)) return;

		window.addEventListener("keydown", onKeydown);

		return () => {
			window.removeEventListener("keydown", onKeydown);
		};
	}, [modalIds]);

	return { isOpen: modalIds.includes(modalId), closeModal };
}
