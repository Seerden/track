import { PropsWithChildren, useRef } from "react";
import { createPortal } from "react-dom";
import useModal from "../lib/use-modal";
import * as S from "./Modal.style";

type ModalProps = {
	initialOpen: boolean;
	outsideStateHandler?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal(
	{ children, initialOpen, outsideStateHandler }: PropsWithChildren<ModalProps> = {
		initialOpen: true
	}
) {
	const modalRef = useRef(null);
	// TODO: if initialOpen is false, we need a way to open the modal. Wait for a
	// use case before thinking about what to do in that case.
	const { isOpen, close } = useModal(modalRef, { initialOpen, outsideStateHandler });

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<S.ModalWrapper>
			<S.Modal ref={modalRef}>
				<S.Close onClick={close} />
				{children}
			</S.Modal>
		</S.ModalWrapper>,
		document.querySelector("#modal-root")!
	);
}
