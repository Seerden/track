import ItemRows from "@/components/logbooks/LogDetail/ItemRows";
import { Button } from "@/components/logbooks/LogDetail/style/_common.style";
import useQueryItems from "@/lib/hooks/query/logbooks/useQueryItems";
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
	if (!itemsData) return null;

	return (
		<S.Wrapper>
			<S.Header>{itemTemplate.name}</S.Header>

			{itemRows.map(({ item_id }) => (
				<ItemRows
					key={item_id}
					item={getItemById(item_id, itemsData.byId)}
					rows={itemRows.filter((row) => row.item_id === item_id)}
				/>
			))}
			<Button $iconPosition={"left"} $color={"darkBlue"}>
				<LucidePencilLine />
				<span style={{ fontWeight: 600 }}>Add {itemTemplate.name}</span>{" "}
			</Button>
		</S.Wrapper>
	);
}
