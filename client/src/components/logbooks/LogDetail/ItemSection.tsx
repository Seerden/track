import useItemSection from "@/components/logbooks/LogDetail/hooks/useItemSection";
import ItemRowsTable from "@/components/logbooks/LogDetail/ItemRowsTable";
import { getRowsForItem } from "@/components/logbooks/LogDetail/lib/get-rows";
import NewItem from "@/components/logbooks/NewItem/NewItem";
import Modal from "@/components/utility/Modal/Modal";
import { Action } from "@/lib/theme/components/buttons";
import type { Item, ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { LucidePencilLine } from "lucide-react";
import S from "./style/ItemSection.style";

export type ItemSectionProps = {
	itemTemplate: ItemTemplate;
	items: Item[];
	log_id: ID;
	logbook_id: ID;
};

export default function ItemSection({
	itemTemplate,
	items,
	log_id,
	logbook_id
}: ItemSectionProps) {
	const { isProbablySuspended, modalId, handleModalOpen, itemRows } = useItemSection({
		itemTemplate,
		log_id
	});

	// TODO: here, filter out any items that are neither in the log's
	// log_template, nor have item rows associated with them for this log.
	const filteredItems = items;

	if (isProbablySuspended) return null;

	return (
		<>
			<S.Wrapper>
				<S.Header>{itemTemplate.name}</S.Header>

				{filteredItems.map((item) => (
					<ItemRowsTable
						log_id={log_id}
						key={item.item_id}
						item={item}
						rows={getRowsForItem({
							itemRows,
							item_id: item.item_id,
							log_id
						})}
					/>
				))}
				<Action.WithIcon $color={"darkBlue"} onClick={handleModalOpen}>
					<LucidePencilLine />
					<span style={{ fontWeight: 600 }}>Add {itemTemplate.name}</span>
				</Action.WithIcon>
			</S.Wrapper>

			<Modal modalId={modalId}>
				<NewItem itemTemplate={itemTemplate} logbook_id={logbook_id} />
			</Modal>
		</>
	);
}
