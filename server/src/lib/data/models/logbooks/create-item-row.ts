import { sqlConnection } from "@/db/init";
import { insertFieldValue } from "@/lib/data/models/logbooks/insert-field-value";
import { insertItemRow } from "@/lib/data/models/logbooks/insert-item-row";
import type {
	ItemRowWithFieldValues,
	NewFieldValue,
	NewItemRow,
} from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const createItemRow: QueryFunction<
	{ newItemRow: NewItemRow; newFieldValues: NewFieldValue[]; user_id: ID },
	Promise<ItemRowWithFieldValues>
> = async ({ sql = sqlConnection, newItemRow, newFieldValues, user_id }) => {
	const result = await sql.begin(async (q) => {
		const itemRow = await insertItemRow({ sql: q, newItemRow, user_id });

		const fieldValues = await Promise.all(
			newFieldValues.map(async (fieldValue) => {
				return await insertFieldValue({
					sql: q,
					newFieldValue: {
						...fieldValue,
						user_id,
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
