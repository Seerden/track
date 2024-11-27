import type {
	FieldTemplate,
	FieldValue,
	Item,
	ItemRow,
	Log
} from "@t/data/logbook.types";

type LogWithEntries = Log & {
	itemRows: ItemRow[];
};

const mockItemRow: ItemRow = {
	item_row_id: 1,
	created_at: new Date(),
	item_id: 1,
	log_id: 1,
	position: 0
};

export default function LogCard({ log }: { log: LogWithEntries }) {
	return (
		<div>
			<h2>{log.name}</h2>
		</div>
	);
}

type ItemRowWithEntries = ItemRow & { item: Item } & {
	// TODO: don't know if we join fieldtemplate inside values, or if we have the
	// templates available elsewhere (=ItemTemplate should be available joined
	// with fieldTemplates as FieldTemplate[]) and just merge them in the UI
	values: (FieldValue & { fieldTemplate: FieldTemplate })[];
};

function ItemRowListItem({ itemRow }: { itemRow: ItemRowWithEntries }) {
	return (
		<li>
			<h3>{itemRow.item.name}</h3>
			<ul>
				{itemRow.values.map((value) => (
					<li
						key={value.field_value_id}
						style={{ display: "flex", flexDirection: "column" }}
					>
						<span>{value.fieldTemplate.name}</span>
						<span>{value.value}</span>
					</li>
				))}
			</ul>
		</li>
	);
}
