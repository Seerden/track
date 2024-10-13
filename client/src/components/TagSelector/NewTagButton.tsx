import { useModalState } from "@/lib/state/modal-state";
import { MdLabelImportant } from "react-icons/md";
import Modal from "../Modal";
import NewTag from "../NewTag/NewTag";
import * as S from "./NewTagButton.style";

export const newTagModalId = "newTagModal";

export default function NewTagButton() {
	const { toggleModal, state } = useModalState(newTagModalId); // TODO: THIS ID IS NOT UNIQUE BECAUSE NewTagButton is called in multiple places!!

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
				<Modal modalId={newTagModalId}>
					<NewTag />
				</Modal>
			)}
		</>
	);
}
