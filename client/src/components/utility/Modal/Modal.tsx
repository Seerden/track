import { FocusTrap } from "@mantine/core";
import { AnimatePresence } from "motion/react";
import type { PropsWithChildren } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import useModal from "@/lib/hooks/useModal";
import type { ModalId } from "@/lib/modal-ids";
import S, {
	modalMotionVariants,
	modalWrapperMotionVariants,
} from "./style/Modal.style";

type ModalProps = {
	modalId: ModalId;
	initialOpen?: boolean;
	/** whether the modal children have a visible scrollbar when overflowing */
	scrollbarVisible?: boolean;
	/** @todo TRK-338 trying this to see if we can force state */
	$key?: string | null;
};

export default function Modal({
	children,
	modalId,
	initialOpen,
	scrollbarVisible = false,
	$key,
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

	return createPortal(
		<FocusTrap>
			<AnimatePresence>
				{isOpen && $key !== null && (
					<S.ModalWrapper
						key={$key ?? modalId}
						layout
						variants={modalWrapperMotionVariants}
						initial="closed"
						animate="opened"
						exit="closed"
						transition={{
							duration: $key === null ? 0 : 0.075,
							type: "tween",
							ease: "easeOut",
						}}
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								handleModalClose(e);
							}
						}}
						data-modal-id={modalId}
					>
						<S.Modal
							layout
							variants={modalMotionVariants}
							initial="closed"
							animate="opened"
							exit="exit"
							transition={{
								duration: 0.075,
								type: "tween",
								ease: "easeOut",
							}}
							ref={modalRef}
							key={`motion-${modalId}`}
							data-modal-id={modalId}
						>
							<S.Close onClick={handleModalClose} $color="orangered" />
							<S.ModalChildWrapper $scrollbarHidden={!scrollbarVisible}>
								{children}
							</S.ModalChildWrapper>
						</S.Modal>
					</S.ModalWrapper>
				)}
			</AnimatePresence>
		</FocusTrap>,
		document.querySelector("#root") as HTMLElement
	);
}
