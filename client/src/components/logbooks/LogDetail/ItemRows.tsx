import ItemHeader from "@/components/logbooks/LogDetail/ItemHeader";
import ItemRowCard from "@/components/logbooks/LogDetail/ItemRowCard";
import useQueryFields from "@/lib/hooks/query/logbooks/useQueryFields";
import { Action } from "@/lib/theme/components/buttons";
import type { Field, Item, ItemRow, ValueType } from "@t/data/logbook.types";
import { LucidePencil } from "lucide-react";
import S from "./style/ItemRows.style";

export type ItemRowsProps = {
	rows: ItemRow[];
	item: Item;
};

function getFieldsForRow(row: ItemRow, fields: Field[]) {
	const itemTemplateId = row.item_id;
	const fieldsForRow = fields.filter(
		(field) => field.item_template_id === itemTemplateId
	);
	return fieldsForRow;
}

/** Renders all the rows for the given item. */
export default function ItemRows({ rows, item }: ItemRowsProps) {
	const { data: fieldsData } = useQueryFields();
	if (!fieldsData) return null;

	const fields = Object.values(fieldsData.byId);

	return (
		<S.Wrapper>
			<S.ItemName>{item.name}</S.ItemName>
			<div>
				<S.Table>
					<ItemHeader fields={getFieldsForRow(rows[0], fields)} />
					{rows.map((row, index) => {
						const _fields = getFieldsForRow(row, fields);

						const mapped = _fields.map((field) => {
							const { values, ..._field } = field;
							const valueForRow = values.find(
								(value) => value.item_row_id === row.item_row_id
							);
							return {
								..._field,
								value: valueForRow?.value
							} as Field & { value: ValueType };
						});
						return <ItemRowCard key={index} fields={mapped} />;
					})}
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
				>
					<LucidePencil /> add to {item.name}
				</Action.Default>
			</div>
			WE ARE HERE
			<Modal modalId={newItemRowModalId}>
				<NewItemRow />
			</Modal>
		</S.Wrapper>
	);
}
