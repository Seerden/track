import { useState } from "react";
import { MdLabelImportant } from "react-icons/md";
import Modal from "../Modal";
import NewTag from "../NewTag/NewTag";
import * as S from "./NewTagButton.style";

export default function NewTagButton() {
	const [isOpen, setIsOpen] = useState(false);

	function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen((current) => !current);
	}

	return (
		<>
			<S.Button onClick={(e) => handleOpen(e)}>
				<MdLabelImportant />
			</S.Button>

			{/* TODO: find a way to reset isOpen state when modal is closed.  */}
			{isOpen && (
				<Modal initialOpen={true} outsideStateHandler={setIsOpen}>
					<NewTag />
				</Modal>
			)}
		</>
	);
}
