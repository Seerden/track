import useMaybeItemRow from "@/components/logbooks/LogDetail/hooks/useMaybeItemRow";
import { eachRequiredFieldHasValue } from "@/components/logbooks/LogDetail/lib/has-values";
import Containers from "@/lib/theme/components/container.style";
import type { FieldTemplateWithValue } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import S from "./style/ItemRow.style";

type ItemRowProps = {
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
	item_row_id: ID;
};

/** If each `field` in `fieldsForItem` has values, returns an ItemRow. */
export default function MaybeItemRow({ item_row_id }: MaybeItemRowProps) {
	const { isProbablySuspended, fields } = useMaybeItemRow({ item_row_id });

	if (isProbablySuspended) return null; // TODO: skeleton state

	if (!eachRequiredFieldHasValue(fields)) return null;

	return <ItemRow fields={fields} />;
}
