import useModal from "@/lib/useModal";
import type { PropsWithChildren } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import * as S from "./Modal.style";

type ModalProps = {
	modalId: string;
	initialOpen?: boolean;
};

export default function Modal({
	children,
	modalId,
	initialOpen
}: PropsWithChildren<ModalProps>) {
	const modalRef = useRef(null);
	const { closeModal, isOpen } = useModal(modalRef, {
		modalId,
		initialOpen
	});

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<S.ModalWrapper>
			<S.Modal ref={modalRef}>
				<S.Close onClick={closeModal} />
				{children}
			</S.Modal>
		</S.ModalWrapper>,
		document.querySelector("#modal-root")!
	);
}
