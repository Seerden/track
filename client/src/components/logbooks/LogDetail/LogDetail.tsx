import useLogDetail from "@/components/logbooks/LogDetail/hooks/useLogDetail";
import LogDetailSection from "@/components/logbooks/LogDetail/LogDetailSection";
import LogSectionSelector from "@/components/logbooks/LogDetail/LogSectionSelector";
import T from "@/components/logbooks/LogDetail/style/_shared.style";
import NewItemTemplate from "@/components/logbooks/NewItemTemplate/NewItemTemplate";
import Modal from "@/components/utility/Modal/Modal";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { Action } from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import type { ID } from "@t/data/utility.types";
import { LucideFolderPen, LucidePlus } from "lucide-react";
import S from "./style/LogDetail.style";

type NewSectionButtonProps = {
	onClick: () => void;
	compact?: boolean;
};

function NewSectionButton({ onClick, compact }: NewSectionButtonProps) {
	return (
		<T.SelectorButton type="button" onClick={onClick} $compact>
			{compact && <>new</>}
			{!compact && <>Add a new section</>}
			<LucidePlus size={15} />
		</T.SelectorButton>
	);
}

export type LogDetailProps = {
	logbook_id?: ID;
};

export default function LogDetail({ logbook_id }: LogDetailProps) {
	const {
		isProbablySuspended,
		logId,
		logbookId,
		log,
		itemTemplates,
		itemTemplateSelection,
		appendLayoutSection
	} = useLogDetail({
		logbook_id
	});

	const { openModal } = useModalState();
	function handleModalOpen() {
		openModal(modalIds.logbooks.itemTemplate.new);
	}

	if (isProbablySuspended || !log) return <div>There is nothing here</div>;

	return (
		<>
			<S.Wrapper>
				<S.LogHeader>{log.name}</S.LogHeader>

				{itemTemplates.length === 0 && (
					<Containers.EmptyState>
						<p>
							It looks awfully empty in here without item templates. Add one to get
							started.
						</p>
						<Action.CallToAction $color="yellow" onClick={handleModalOpen}>
							<LucideFolderPen />
							Create an item template
						</Action.CallToAction>
					</Containers.EmptyState>
				)}

				{itemTemplates.length > 0 && (
					<S.Sections>
						{itemTemplateSelection?.included.map((template, index) => (
							<LogDetailSection
								logbook_id={logbookId}
								log_id={logId}
								key={index}
								itemTemplate={template}
							/>
						))}

						<S.NewSectionWrapper>
							{itemTemplateSelection?.included.length === 0 ? (
								<S.NewSectionTitle>
									You have not selected any item templates yet. Create or select
									one to get started.
								</S.NewSectionTitle>
							) : (
								<S.NewSectionTitle>Add a section</S.NewSectionTitle>
							)}
							<S.SectionSelectorWrapper>
								{itemTemplateSelection?.excluded && (
									<LogSectionSelector
										itemTemplates={itemTemplateSelection.excluded}
										onChange={appendLayoutSection}
									/>
								)}
								<NewSectionButton onClick={handleModalOpen} compact />
							</S.SectionSelectorWrapper>
						</S.NewSectionWrapper>
					</S.Sections>
				)}
			</S.Wrapper>

			{!!logbookId && (
				<Modal modalId={modalIds.logbooks.itemTemplate.new}>
					<NewItemTemplate logbook_id={logbookId} />
				</Modal>
			)}
		</>
	);
}
