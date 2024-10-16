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
				<Modal modalId={modalId}>
					<NewTag />
				</Modal>
			)}
		</>
	);
}
