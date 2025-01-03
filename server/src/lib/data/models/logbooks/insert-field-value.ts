import { sqlConnection } from "@/db/init";
import type { FieldValue, NewFieldValueWithId } from "@shared/types/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const insertFieldValue: QueryFunction<
	{ newFieldValue: NewFieldValueWithId },
	Promise<FieldValue>
> = async ({ sql = sqlConnection, newFieldValue }) => {
	const [insertedFieldValue] = await sql<[FieldValue]>`
      INSERT INTO field_values ${sql(newFieldValue)}
      RETURNING *
   `;

	return insertedFieldValue;
};
