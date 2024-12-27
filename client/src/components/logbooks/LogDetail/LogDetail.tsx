import useLogDetail from "@/components/logbooks/LogDetail/hooks/useLogDetail";
import LogDetailSection from "@/components/logbooks/LogDetail/LogDetailSection";
import LogSectionSelector from "@/components/logbooks/LogDetail/LogSectionSelector";
import NewItemTemplate from "@/components/logbooks/NewItemTemplate/NewItemTemplate";
import Modal from "@/components/utility/Modal/Modal";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { Action } from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import type { ID } from "@t/data/utility.types";
import { LucideFolderPen } from "lucide-react";
import S from "./style/LogDetail.style";

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
		includedItemTemplates,
		excludedItemTemplates,
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
				<S.LogHeader>{log?.name}</S.LogHeader>

				<S.Sections>
					{includedItemTemplates?.map((template, index) => (
						<LogDetailSection
							logbook_id={logbookId}
							log_id={logId}
							key={index}
							itemTemplate={template}
						/>
					))}

					{itemTemplates?.length === 0 && (
						<Containers.EmptyState>
							<p>
								It looks awfully empty in here without item templates. Add one to
								get started.
							</p>
							<Action.CallToAction $color="yellow" onClick={handleModalOpen}>
								<LucideFolderPen />
								Create an item template
							</Action.CallToAction>
						</Containers.EmptyState>
					)}

					{/* TODO */}
					{includedItemTemplates?.length === 0 &&
						Array.isArray(excludedItemTemplates) &&
						excludedItemTemplates.length > 0 && (
							<>
								<p>
									You have not selected any item templates yet. Select one to get
									started.
								</p>

								<LogSectionSelector
									itemTemplates={excludedItemTemplates ?? []}
									onChange={appendLayoutSection}
								/>
							</>
						)}
				</S.Sections>
			</S.Wrapper>
			{!!logbookId && (
				<Modal modalId={modalIds.logbooks.itemTemplate.new}>
					<NewItemTemplate logbook_id={logbookId} />
				</Modal>
			)}
		</>
	);
}
