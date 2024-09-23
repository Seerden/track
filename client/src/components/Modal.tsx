import { PropsWithChildren, useRef } from "react";
import useModal from "../lib/use-modal";
import * as S from "./Modal.style";

export default function Modal({
	children,
	initialOpen
}: PropsWithChildren<{ initialOpen: boolean }>) {
	const modalRef = useRef(null);
	const { isOpen, close } = useModal(modalRef, { initialOpen });

	if (!isOpen) {
		return null;
	}

	return (
		<S.ModalWrapper>
			<S.Modal ref={modalRef}>
				<S.Close onClick={close} />
				{children}
			</S.Modal>
		</S.ModalWrapper>
	);
}
