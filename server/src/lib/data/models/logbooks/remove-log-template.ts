import { sqlConnection } from "@/db/init";
import type { LogTemplate } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/**
 * Delete a single logTemplate by its ID.
 */
export const removeLogTemplateById: QueryFunction<
	{ log_template_id: ID },
	Promise<Pick<LogTemplate, "log_template_id">>
> = async ({ sql = sqlConnection, log_template_id }) => {
	const [deleted] = await sql<[Pick<LogTemplate, "log_template_id">]>`
      DELETE FROM log_templates
      WHERE log_template_id = ${log_template_id}
      RETURNING log_template_id
   `;

	return deleted;
};
