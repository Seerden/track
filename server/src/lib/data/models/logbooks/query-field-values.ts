import { sqlConnection } from "@/db/init";
import type { FieldValue } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Get all field values that belong to the given log. */
export const queryFieldValuesByLog: QueryFunction<
	{ log_id: ID },
	Promise<FieldValue[]>
> = async ({ sql = sqlConnection, log_id }) => {
	const fieldValues = await sql<[FieldValue]>`
      SELECT * FROM field_values
      WHERE log_id = ${log_id}
   `;

	return fieldValues;
};
