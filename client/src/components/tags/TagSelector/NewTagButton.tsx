import { Tags as LucideTags } from "lucide-react";
import TagForm from "@/components/tags/TagForm/TagForm";
import Modal from "@/components/utility/Modal/Modal";
import type { ModalId } from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import S from "./style/NewTagButton.style";

type NewTagButtonProps = {
	modalId: ModalId;
	size?: number;
};

export default function NewTagButton({
	modalId,
	size = 16,
}: NewTagButtonProps) {
	const { toggleModal, modalIds } = useModalState();

	function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		toggleModal(modalId);
	}

	return (
		<>
			<S.Button
				type="button"
				title="Create a tag"
				onClick={handleOpen}
				$color={"darkorchid"}
			>
				<LucideTags size={size} />
			</S.Button>

			{/* NOTE: passing the same modalId here twice may seem weird, but
				   it's technically possible for this thing to get nested modals
				   (e.g. when a modal contains a TagSelector, which contains a
				   NewTagButton, which on click opens another modal, etc.) It's
				   unlikely though, because we usually don't put `showNewTagButton` on
				   the TagSelector inside the NewTagButton (because that makes no sense). */}
			<Modal modalId={modalId}>
				{modalIds.includes(modalId) && (
					<TagForm modalId={`${modalId}-nested` as ModalId} />
				)}
			</Modal>
		</>
	);
}
