import type { FieldTemplateWithValue } from "@/components/logbooks/logbook.types";
import { hasValues } from "@/components/logbooks/LogDetail/lib/has-values";
import Containers from "@/lib/theme/components/container.style";
import type { Field } from "@t/data/logbook.api.types";
import type { ID } from "@t/data/utility.types";
import S from "./style/ItemRow.style";

/**
 * @todo I do not like how ItemRow and MaybeItemRow both have a `fields` prop, but
 * the actual type of each `fields` is different.
 */

export type ItemRowProps = {
	fields: FieldTemplateWithValue[];
};

/** Renders a single table row for an item: one cell for every `field` in
 * `fields`. */
function ItemRow({ fields }: ItemRowProps) {
	return (
		<S.RowWrapper>
			{fields.map((field) => (
				<S.Field key={field.name}>
					<Containers.Field $small>
						{field.value} {field.unit}
					</Containers.Field>
				</S.Field>
			))}
		</S.RowWrapper>
	);
}

type MaybeItemRowProps = {
	fields: Field[];
	item_row_id: ID;
};

/** If each `field` in `fieldsForItem` has values, returns an ItemRow. */
export default function MaybeItemRow({ fields, item_row_id }: MaybeItemRowProps) {
	// const { data: fields } = useQueryFieldsByItemRow(item_row_id) // TODO(TRK-182)

	const fieldAndValueList = fields.map((field) => {
		const { values, ..._field } = field;

		/** @todo issue #175 */
		const fieldValue = values.find((value) => +value.item_row_id === +item_row_id);

		return Object.assign({}, _field, {
			value: fieldValue?.value
		});
	});

	// TODO(TRK-182): rename hasValues to eachFieldHasValue
	if (!hasValues(fieldAndValueList)) return null;

	return <ItemRow fields={fieldAndValueList} />;
}
