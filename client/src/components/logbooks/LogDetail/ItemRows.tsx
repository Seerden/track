import ItemHeader from "@/components/logbooks/LogDetail/ItemHeader";
import ItemRowCard from "@/components/logbooks/LogDetail/ItemRowCard";
import NewItemRow from "@/components/logbooks/NewItemRow/NewItemRow";
import useQueryFields from "@/lib/hooks/query/logbooks/useQueryFields";
import { Action } from "@/lib/theme/components/buttons";
import type { Field, Item, ItemRow, ValueType } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { LucidePencil } from "lucide-react";
import { useState } from "react";
import S from "./style/ItemRows.style";

export type ItemRowsProps = {
	rows: ItemRow[];
	item: Item;
	log_id: ID;
};

function getFieldsForItem({ item, fields }: { item: Item | undefined; fields: Field[] }) {
	if (!item || !fields.length) return [];
	const fieldsForItem = fields.filter(
		// @see issue #175
		(field) => +field.item_template_id === +item.item_template_id
	);
	return fieldsForItem;
}

/** Renders all the rows for the given item. */
export default function ItemRows({ rows, item, log_id }: ItemRowsProps) {
	console.log({ rows });
	const { data: fieldsData } = useQueryFields();
	const [newRowCount, setNewRowCount] = useState<number>(1);

	function addRow() {
		setNewRowCount((current) => current + 1);
	}

	if (!fieldsData) return null;
	const fieldsForItem = getFieldsForItem({
		item,
		fields: Object.values(fieldsData.byId)
	});

	return (
		<S.Wrapper>
			<S.ItemName>{item.name}</S.ItemName>
			<div>
				<S.Table>
					{/* TODO: why do we call the itemHeader "fields" prop "fields" when it's actually "fieldTemplates" */}
					<ItemHeader fields={fieldsForItem} />
					{/* TODO: only show rows with values */}
					{rows.map((row, index) => {
						const mapped = fieldsForItem.map((field) => {
							const { values, ..._field } = field;
							const valueForRow = values.find(
								(value) => +value.item_row_id === +row.item_row_id
							);
							return {
								..._field,
								value: valueForRow?.value
							} as Field & { value: ValueType };
						});

						const hasValues = mapped.some((field) => field.value !== undefined);
						return hasValues ? <ItemRowCard key={index} fields={mapped} /> : null;
					})}
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
				<Action.Default
					$color="yellow"
					style={{
						color: "black",
						borderRadius: 5,
						width: "max-content",
						padding: "0.5rem 1rem",
						paddingLeft: "0.5rem",
						marginTop: "0.5rem",
						marginLeft: "1rem",
						display: "flex",
						gap: "1rem"
					}}
					onClick={addRow}
				>
					<LucidePencil /> add to {item.name}
				</Action.Default>
			</div>
		</S.Wrapper>
	);
}
