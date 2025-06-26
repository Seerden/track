import type { ModalId } from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { RefObject } from "react";
import { useCallback, useEffect } from "react";

type UseModalProps = {
	keys?: string[];
	modalId: ModalId;
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

	function closeModal(modalId: ModalId) {
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
		// I've been struggling to get these event handlers to act _exactly_ as
		// intended in _every_ situation. See notes in https://github.com/Seerden/track/pull/133
		if (!modalIds.includes(modalId)) return;

		window.addEventListener("keydown", onKeydown);

		return () => {
			window.removeEventListener("keydown", onKeydown);
		};
	}, [modalIds]);

	return { isOpen: modalIds.includes(modalId), closeModal };
}
