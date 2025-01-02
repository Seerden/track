import { sqlConnection } from "@/db/init";
import { groupById } from "@/lib/data/models/group-by-id";
import type { Field } from "@t/data/logbook.types";
import type { ById, ID } from "@t/data/utility.types";
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
