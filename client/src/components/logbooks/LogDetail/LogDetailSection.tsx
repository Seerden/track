import useLogDetailSection from "@/components/logbooks/LogDetail/hooks/useLogDetailSection";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import ItemSelector from "@/components/logbooks/LogDetail/ItemSelector";
import NewItem from "@/components/logbooks/NewItem/NewItem";
import Modal from "@/components/utility/Modal/Modal";
import type { ItemTemplate } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import T from "./style/_shared.style";
import S from "./style/LogDetailSection.style";

export type LogDetailSectionProps = {
	itemTemplate: ItemTemplate;
	log_id: ID;
	logbook_id: ID;
};

export default function LogDetailSection({
	itemTemplate,
	log_id,
	logbook_id
}: LogDetailSectionProps) {
	const {
		isProbablySuspended,
		modalId,
		items,
		itemSelection,
		fieldTemplates,
		handleModalOpen,
		addItemToSection
	} = useLogDetailSection({
		itemTemplate,
		log_id
	});

	if (isProbablySuspended) return null;

	return (
		<>
			<T.SectionWrapper>
				<S.Header>{itemTemplate.name}</S.Header>

				<S.ItemSections>
					{itemSelection.included.map((item) => (
						<ItemSection
							fieldTemplates={fieldTemplates}
							log_id={log_id}
							key={item.item_id}
							item={item}
						/>
					))}
				</S.ItemSections>

				<S.AddSectionWrapper>
					{items.length === 0 ? (
						<>
							<p>
								This item template does not have any items yet. Add one to get
								started.
							</p>
							<button type="button" onClick={handleModalOpen}>
								Add an item
							</button>
						</>
					) : (
						<>
							<S.SubTitle>Add another "{itemTemplate.name}"</S.SubTitle>
							<ItemSelector
								item_template_id={itemTemplate.item_template_id}
								logbook_id={logbook_id}
								items={itemSelection?.excluded ?? []}
								onChange={addItemToSection}
							/>
						</>
					)}
				</S.AddSectionWrapper>
			</T.SectionWrapper>

			<Modal modalId={modalId}>
				<NewItem itemTemplate={itemTemplate} logbook_id={logbook_id} />
			</Modal>
		</>
	);
}
