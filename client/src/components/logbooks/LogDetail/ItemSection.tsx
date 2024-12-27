import ItemSectionHeader from "@/components/logbooks/LogDetail/ItemSectionHeader";
import MaybeTableRow from "@/components/logbooks/LogDetail/MaybeTableRow";
import NewItemRow from "@/components/logbooks/LogDetail/NewItemRow";
import useItemSection from "@/components/logbooks/LogDetail/hooks/useItemSection";
import type { Item, ItemRow } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { LucidePlusSquare } from "lucide-react";
import S from "./style/ItemSection.style";

export type ItemSectionProps = {
	rows: ItemRow[];
	item: Item;
	log_id: ID;
};

/** Renders all the rows for the given item.
 * @todo ^ this description sucks, make it more descriptive
 */
export default function ItemSection({ rows, item, log_id }: ItemSectionProps) {
	const { addRow, fieldsData, fieldsForItem, newRowCount } = useItemSection({ item });

	if (!fieldsData) return null;

	return (
		<S.Wrapper>
			<S.ItemName>{item.name}</S.ItemName>
			<div>
				<S.Table>
					<ItemSectionHeader labels={fieldsForItem.map((field) => field.name)} />

					{rows.map(({ item_row_id }, index) => (
						<MaybeTableRow
							key={index}
							fieldsForItem={fieldsForItem}
							item_row_id={item_row_id}
							index={index}
						/>
					))}

					{/* TODO: only allow 1 new row at a time? Then the AddNewItemRowButton 
               becomes obsolete, because we'll always show the single new row */}
					{Array.from({ length: newRowCount }).map((_, index) => (
						<NewItemRow
							log_id={log_id}
							key={rows.length + index}
							position={rows.length + index}
							item={item}
							fieldTemplates={fieldsForItem}
						/>
					))}
				</S.Table>

				<AddNewItemRowButton name={item.name} onClick={addRow} />
			</div>
		</S.Wrapper>
	);
}

type AddNewItemRowButtonProps = {
	name: string;
	onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

function AddNewItemRowButton({ name, onClick }: AddNewItemRowButtonProps) {
	return (
		<S.Button type="button" onClick={onClick}>
			<LucidePlusSquare />
		</S.Button>
	);
}
