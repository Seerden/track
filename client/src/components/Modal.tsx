import useModal from "@/lib/hooks/useModal";
import type { PropsWithChildren } from "react";
import { useRef } from "react";
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

	return (
		<S.ModalWrapper>
			<S.Modal ref={modalRef} data-modal-id={modalId}>
				<S.Close
					onClick={(e) => {
						e.stopPropagation();
						closeModal(modalId);
					}}
				/>
				{children}
			</S.Modal>
		</S.ModalWrapper>
	);
}
