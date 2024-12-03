import NewItemTemplate from "@/components/logbooks/fields/NewItemTemplate/NewItemTemplate";
import ItemRows from "@/components/logbooks/LogDetail/ItemRows";
import { Button } from "@/components/logbooks/LogDetail/style/_common.style";
import Modal from "@/components/utility/Modal/Modal";
import useQueryItems from "@/lib/hooks/query/logbooks/useQueryItems";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { Item, ItemRow, ItemTemplate } from "@t/data/logbook.types";
import type { ById, ID } from "@t/data/utility.types";
import { LucidePencilLine } from "lucide-react";
import S from "./style/ItemSection.style";

export type ItemSectionProps = {
	itemTemplate: ItemTemplate;
	itemRows: ItemRow[];
};

function getItemById(id: ID, items: ById<Item>) {
	console.log({ id, items });
	return items[id];
}

export default function ItemSection({ itemTemplate, itemRows }: ItemSectionProps) {
	const { data: itemsData } = useQueryItems();
	const { openModal } = useModalState();
	if (!itemsData) return null;

	return (
		<>
			<S.Wrapper>
				<S.Header>{itemTemplate.name}</S.Header>

				{itemRows.map(({ item_id }) => (
					<ItemRows
						key={item_id}
						item={getItemById(item_id, itemsData.byId)}
						rows={itemRows.filter((row) => row.item_id === item_id)}
					/>
				))}
				<Button
					$iconPosition={"left"}
					$color={"darkBlue"}
					onClick={(e) => {
						e.preventDefault();
						openModal(modalIds.logbooks.itemTemplate.new);
					}}
				>
					<LucidePencilLine />
					<span style={{ fontWeight: 600 }}>Add {itemTemplate.name}</span>{" "}
				</Button>
			</S.Wrapper>

			<Modal modalId={modalIds.logbooks.itemTemplate.new}>
				<NewItemTemplate logbook_id={itemTemplate.logbook_id} />
			</Modal>
		</>
	);
}
