import { useModalState } from "@/lib/state/modal-state";
import { MdLabelImportant } from "react-icons/md";
import Modal from "../Modal";
import NewTag from "../NewTag/NewTag";
import * as S from "./NewTagButton.style";

type NewTagButtonProps = {
	modalId: string;
};

export default function NewTagButton({ modalId }: NewTagButtonProps) {
	const { toggleModal, state } = useModalState(modalId);

	function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		e.stopPropagation();
		toggleModal();
	}

	return (
		<>
			<S.Button onClick={(e) => handleOpen(e)}>
				<MdLabelImportant />
			</S.Button>

			{state.isOpen && (
				// NOTE: passing the same modalId here twice may seem weird, but
				// it's technically possible for this thing to get nested modals
				// (e.g. when a modal contains a TagSelector, which contains a
				// NewTagButton, which on click opens another modal, etc.) It's
				// unlikely though, because we usually don't put `showNewTagButton` on
				// the TagSelector inside the NewTagButton (because that makes no sense).
				<Modal modalId={modalId}>
					<NewTag modalId={`${modalId}-nested`} />
				</Modal>
			)}
		</>
	);
}
