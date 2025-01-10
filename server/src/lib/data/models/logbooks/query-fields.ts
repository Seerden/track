import { sqlConnection } from "@/db/init";
import { groupById } from "@/lib/data/models/group-by-id";
import type {
	Field,
	FieldTemplateWithMaybeValue,
} from "@shared/types/data/logbook.types";
import type { ById, ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Get all fields belonging to a user. A field is a fieldTemplate along with
 * all of the fieldValues that belong to it.
 * @see https://github.com/Seerden/track/issues/177 - this new implementation
 * fits the new requirements.
 **/
export const queryFields: QueryFunction<{ user_id: ID }, Promise<ById<Field>>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	const fields = await sql<[Field]>`
      SELECT 
         t.*, 
         jsonb_agg(v.*) AS values
      FROM field_templates t
      LEFT JOIN field_values v
      ON t.field_template_id = v.field_template_id
      WHERE t.user_id = ${user_id}
      AND v.user_id = ${user_id}
      GROUP BY t.field_template_id
   `;

	return groupById(fields, "field_template_id");
};

/** For the given item row, gets all field templates along with their value
 * (value can be null -- e.g. when the field is optional). */
export const queryFieldsByItemRow: QueryFunction<
	{ item_row_id: ID },
	Promise<FieldTemplateWithMaybeValue[]>
> = async ({ sql = sqlConnection, item_row_id }) => {
	return await sql<[FieldTemplateWithMaybeValue]>`
      SELECT t.*, v.value
      FROM field_templates t
      JOIN field_values v 
      ON v.field_template_id = t.field_template_id 
      WHERE v.item_row_id = ${item_row_id}
   `;
};
