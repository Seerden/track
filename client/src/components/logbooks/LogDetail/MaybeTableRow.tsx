import { hasValues } from "@/components/logbooks/LogDetail/has-values";
import ItemTableRow from "@/components/logbooks/LogDetail/ItemTableRow";
import type { Field } from "@t/data/logbook.api.types";
import type { ID } from "@t/data/utility.types";

type MaybeTableRowProps = {
	fieldsForItem: Field[];
	item_row_id: ID;
	index: number;
};

/** If each `field` in `fieldsForItem` has values, returns an ItemRowCard.
 * @todo this is basically a small wrapper for ItemRowCard, so maybe put them in
 * the same subfolder.
 */
export default function MaybeTableRow({
	fieldsForItem,
	item_row_id,
	index
}: MaybeTableRowProps) {
	const fieldAndValueList = fieldsForItem.map((field) => {
		const { values, ..._field } = field;

		/** @todo issue #175 */
		const fieldValue = values.find((value) => +value.item_row_id === +item_row_id);

		return Object.assign({}, _field, {
			value: fieldValue?.value
		});
	});

	return !hasValues(fieldAndValueList) ? null : (
		<ItemTableRow key={index} fields={fieldAndValueList} />
	);
}
