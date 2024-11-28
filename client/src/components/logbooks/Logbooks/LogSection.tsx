// LogSection represents an item and all of its rows.
// It displays the item name and a list of ItemRowListItems.

import { ItemRowListItem } from "@/components/logbooks/Logbooks/LogCard";
import type { FieldTemplate, FieldValue, Item, ItemRow } from "@t/data/logbook.types";

type Field = {
	template: FieldTemplate;
	value: FieldValue;
};
type Row = ItemRow & { item: Item } & { fields: Field[] };
type Rows = Row[];
type Section = Rows[];

export default function LogSection({ section }: { section: Section }) {
	return (
		<section>
			<h1>{item.name}</h1>
			<ul>
				{item.itemRows.map((itemRow) => (
					<ItemRowListItem key={itemRow.item_row_id} itemRow={itemRow} />
				))}
			</ul>
		</section>
	);
}
