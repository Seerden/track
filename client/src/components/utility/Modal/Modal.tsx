import { FocusTrap } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { useRef } from "react";
import useModal from "@/lib/hooks/useModal";
import type { ModalId } from "@/lib/modal-ids";
import S from "./style/Modal.style";

type ModalProps = {
	modalId: ModalId;
	initialOpen?: boolean;
	/** whether the modal children have a visible scrollbar when overflowing */
	scrollbarVisible?: boolean;
};

export default function Modal({
	children,
	modalId,
	initialOpen,
	scrollbarVisible = false,
}: PropsWithChildren<ModalProps>) {
	const modalRef = useRef(null);
	const { closeModal, isOpen } = useModal(modalRef, {
		modalId,
		initialOpen,
	});

	function handleModalClose(
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) {
		e.stopPropagation();
		closeModal(modalId);
	}

	if (!isOpen) {
		return null;
	}

	return (
		<FocusTrap>
			<S.ModalWrapper
				onClick={(e) => {
					if (e.target === e.currentTarget) {
						handleModalClose(e);
					}
				}}
				data-modal-id={modalId}>
				<S.Modal ref={modalRef} data-modal-id={modalId}>
					<S.Close onClick={handleModalClose} $color="red" />
					<S.ModalChildWrapper scrollbarVisible={scrollbarVisible}>
						{children}
					</S.ModalChildWrapper>
				</S.Modal>
			</S.ModalWrapper>
		</FocusTrap>
	);
}
