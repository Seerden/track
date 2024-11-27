import type {
	FieldTemplate,
	FieldValue,
	Item,
	ItemRow,
	Log
} from "@t/data/logbook.types";
import S from "./style/ItemRowListItem.style";
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

export type ItemRowWithEntries = ItemRow & { item: Item } & {
	// TODO: don't know if we join fieldtemplate inside values, or if we have the
	// templates available elsewhere (=ItemTemplate should be available joined
	// with fieldTemplates as FieldTemplate[]) and just merge them in the UI
	values: (FieldValue & { fieldTemplate: FieldTemplate })[];
};

export function ItemRowListItem({ itemRow }: { itemRow: ItemRowWithEntries }) {
	return (
		<S.ListItem>
			{itemRow.values.map((value) => (
				<S.LabelAndValue key={value.field_value_id}>
					<span>{value.fieldTemplate.name}</span>
					<span>{value.value}</span>
				</S.LabelAndValue>
			))}
		</S.ListItem>
	);
}
