import useModal from "@/lib/hooks/useModal";
import type { ModalId } from "@/lib/modal-ids";
import type { PropsWithChildren } from "react";
import { useRef } from "react";
import S from "./style/Modal.style";

type ModalProps = {
	modalId: ModalId;
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

	function handleModalClose(e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) {
		e.stopPropagation();
		closeModal(modalId);
	}

	if (!isOpen) {
		return null;
	}

	return (
		<S.ModalWrapper
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					handleModalClose(e);
				}
			}}
			data-modal-id={modalId}
		>
			<S.Modal ref={modalRef} data-modal-id={modalId}>
				<S.Close onClick={handleModalClose} $color="red" />
				{children}
			</S.Modal>
		</S.ModalWrapper>
	);
}
