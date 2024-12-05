import ItemRowsTable from "@/components/logbooks/LogDetail/ItemRowsTable";
import { getRowsForItem } from "@/components/logbooks/LogDetail/lib/get-rows";
import { Button } from "@/components/logbooks/LogDetail/style/_common.style";
import useItemSection from "@/components/logbooks/LogDetail/useItemSection";
import NewItem from "@/components/logbooks/NewItem/NewItem";
import Modal from "@/components/utility/Modal/Modal";
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
		itemTemplate
	});

	if (isProbablySuspended) return null;

	return (
		<>
			<S.Wrapper>
				<S.Header>{itemTemplate.name}</S.Header>

				{items.map((item) => (
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
				<Button $iconPosition={"left"} $color={"darkBlue"} onClick={handleModalOpen}>
					<LucidePencilLine />
					<span style={{ fontWeight: 600 }}>Add {itemTemplate.name}</span>
				</Button>
			</S.Wrapper>

			<Modal modalId={modalId}>
				<NewItem itemTemplate={itemTemplate} logbook_id={logbook_id} />
			</Modal>
		</>
	);
}
