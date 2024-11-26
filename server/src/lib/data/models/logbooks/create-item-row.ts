import { sqlConnection } from "@/db/init";
import { insertFieldValue } from "@/lib/data/models/logbooks/insert-field-value";
import { insertItemRow } from "@/lib/data/models/logbooks/insert-item-row";
import type { NewFieldValue, NewItemRow } from "@t/data/logbook.new.types";
import type { FieldValue, ItemRow } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const createItemRow: QueryFunction<
	{ newItemRow: NewItemRow; newFieldValues: NewFieldValue[] },
	Promise<{
		itemRow: ItemRow;
		fieldValues: FieldValue[];
	}>
> = async ({ sql = sqlConnection, newItemRow, newFieldValues }) => {
	const result = await sql.begin(async (q) => {
		// first, insert the item row
		const itemRow = await insertItemRow({ sql: q, newItemRow });

		// then, insert the field values with the newly created item row's id
		const fieldValues = await Promise.all(
			newFieldValues.map(async (fieldValue) => {
				return await insertFieldValue({
					sql: q,
					newFieldValue: {
						...fieldValue,
						item_row_id: itemRow.item_row_id,
					},
				});
			}),
		);

		return {
			itemRow,
			fieldValues,
		};
	});

	return result;
};
