import NewItem from "@/components/logbooks/fields/NewItem/NewItem";
import ItemRows from "@/components/logbooks/LogDetail/ItemRows";
import { Button } from "@/components/logbooks/LogDetail/style/_common.style";
import Modal from "@/components/utility/Modal/Modal";
import useQueryItemRows from "@/lib/hooks/query/logbooks/useQueryItemRows";
import useQueryItems from "@/lib/hooks/query/logbooks/useQueryItems";
import type { ModalId } from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { Item, ItemTemplate } from "@t/data/logbook.types";
import type { ById, ID, Maybe } from "@t/data/utility.types";
import { LucidePencilLine } from "lucide-react";
import S from "./style/ItemSection.style";

export type ItemSectionProps = {
	itemTemplate: ItemTemplate;
	items: Item[];
	log_id: ID;
	logbook_id: ID;
};

function getItemById(id: ID, items: ById<Item>): Maybe<Item> {
	return items[id];
}

export default function ItemSection({
	itemTemplate,
	items,
	log_id,
	logbook_id
}: ItemSectionProps) {
	const { data: itemsData } = useQueryItems();
	const { data: itemRowsData } = useQueryItemRows();

	const { openModal } = useModalState();
	if (!itemsData || !itemRowsData) return null;
	console.log({ itemRowsData });

	return (
		<>
			<S.Wrapper>
				<S.Header>{itemTemplate.name}</S.Header>

				{items.map(({ item_id }) => {
					const item = getItemById(item_id, itemsData.byId);
					if (!item) return null;

					return (
						<ItemRows
							log_id={log_id}
							key={item_id}
							item={item}
							rows={Object.values(itemRowsData.byId).filter(
								// TODO: see #175 -- don't want to have to parse the id
								(row) => +row.item_id === +item_id
							)}
						/>
					);
				})}
				<Button
					$iconPosition={"left"}
					$color={"darkBlue"}
					onClick={(e) => {
						e.preventDefault();
						openModal(
							`modalIds.logbooks.itemTemplate.new-${itemTemplate.name}` as ModalId
						); // TODO: this should open a NewItem, not NewItemTemplate
					}}
				>
					<LucidePencilLine />
					<span style={{ fontWeight: 600 }}>Add {itemTemplate.name}</span>{" "}
				</Button>
			</S.Wrapper>

			<Modal
				modalId={`modalIds.logbooks.itemTemplate.new-${itemTemplate.name}` as ModalId}
			>
				<NewItem itemTemplate={itemTemplate} logbook_id={logbook_id} />
			</Modal>
		</>
	);
}
