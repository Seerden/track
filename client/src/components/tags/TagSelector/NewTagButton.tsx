import Modal from "@/components/utility/Modal/Modal";
import type { ModalId } from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import NewTag from "@components/tags/NewTag/NewTag";
import { AiFillTags } from "react-icons/ai";
import S from "./style/NewTagButton.style";

type NewTagButtonProps = {
	modalId: ModalId;
	size?: number;
};

export default function NewTagButton({ modalId, size = 15 }: NewTagButtonProps) {
	const { toggleModal, modalIds } = useModalState();

	function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		toggleModal(modalId);
	}

	return (
		<>
			<S.Button title="Make a new tag" onClick={(e) => handleOpen(e)}>
				<AiFillTags size={size} />
			</S.Button>

			{modalIds.includes(modalId) && (
				// NOTE: passing the same modalId here twice may seem weird, but
				// it's technically possible for this thing to get nested modals
				// (e.g. when a modal contains a TagSelector, which contains a
				// NewTagButton, which on click opens another modal, etc.) It's
				// unlikely though, because we usually don't put `showNewTagButton` on
				// the TagSelector inside the NewTagButton (because that makes no sense).
				<Modal modalId={modalId}>
					<NewTag modalId={`${modalId}-nested` as ModalId} />
				</Modal>
			)}
		</>
	);
}
