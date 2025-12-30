import type { TagWithIds } from "@shared/lib/schemas/tag";
import { LucidePenLine } from "lucide-react";
import TagBranch from "@/components/tags/DetailedTag/TagBranch";
import { useDetailedTag } from "@/components/tags/DetailedTag/useDetailedTag";
import TagForm from "@/components/tags/TagForm/TagForm";
import Modal from "@/components/utility/Modal/Modal";
import TwoStepDelete from "@/components/utility/Modal/TwoStepDelete";
import { formatDate } from "@/lib/datetime/format-date";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import Buttons from "@/lib/theme/components/buttons";
import Card from "@/lib/theme/components/Card.style";
import { ActionBar } from "@/lib/theme/components/containers/action-bar.style";
import S from "./style/DetailedTag.style";

type DetailedTagProps = {
	tag: TagWithIds;
};

export default function DetailedTag({ tag }: DetailedTagProps) {
	const { handleDeleteTag, humanizedCreatedAt, tags } = useDetailedTag(tag);
	const { openModal } = useModalState();

	return (
		<>
			<S.Wrapper>
				<Card.Title>{tag.name}</Card.Title>
				<ActionBar.DetailModal>
					<TwoStepDelete
						confirmLabel="Delete"
						rejectLabel="Keep"
						handleConfirmClick={handleDeleteTag}
						title="Delete this tag?"
					/>

					<Buttons.Action.Stylized
						type="button"
						title="Edit this activity"
						$color="royalblue"
						onClick={(e) => {
							e.stopPropagation();
							openModal(modalIds.tags.form);
						}}
					>
						<LucidePenLine size={20} />
					</Buttons.Action.Stylized>
				</ActionBar.DetailModal>
				<p>{tag.description}</p>
				<TagBranch tag={tag} />
				<Card.Datetime>
					<span title={formatDate(tag.created_at)}>
						created {humanizedCreatedAt}
					</span>
				</Card.Datetime>
			</S.Wrapper>
			<Modal modalId={modalIds.tags.form}>
				<TagForm modalId={modalIds.tags.form} tag={tags?.get(tag.tag_id)} />
			</Modal>
		</>
	);
}
