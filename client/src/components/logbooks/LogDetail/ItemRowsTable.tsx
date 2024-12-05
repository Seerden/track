import ItemRowsTableHeader from "@/components/logbooks/LogDetail/ItemRowsTableHeader";
import MaybeTableRow from "@/components/logbooks/LogDetail/MaybeTableRow";
import useItemRowsTable from "@/components/logbooks/LogDetail/useItemRowsTable";
import NewItemRow from "@/components/logbooks/NewItemRow/NewItemRow";
import type { Item, ItemRow } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { LucidePencil } from "lucide-react";
import S from "./style/ItemRowsTable.style";

export type ItemRowsProps = {
	rows: ItemRow[];
	item: Item;
	log_id: ID;
};

/** Renders all the rows for the given item.
 * @todo ^ this description sucks, make it more descriptive
 */
export default function ItemRowsTable({ rows, item, log_id }: ItemRowsProps) {
	const { addRow, fieldsData, fieldsForItem, newRowCount } = useItemRowsTable({ item });

	if (!fieldsData) return null;

	return (
		<S.Wrapper>
			<S.ItemName>{item.name}</S.ItemName>
			<div>
				<S.Table>
					<ItemRowsTableHeader labels={fieldsForItem.map((field) => field.name)} />

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
		<S.Button $color="yellow" type="button" onClick={onClick}>
			<LucidePencil /> add to {name}
		</S.Button>
	);
}
