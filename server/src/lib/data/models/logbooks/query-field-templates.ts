import { sqlConnection } from "@/db/init";
import type { FieldTemplate } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Get all field templates that belong to the given item template. */
export const queryFieldTemplatesByItemTemplate: QueryFunction<
	{ item_template_id: ID },
	Promise<FieldTemplate[]>
> = async ({ sql = sqlConnection, item_template_id }) => {
	const fieldTemplates = await sql<[FieldTemplate]>`
      SELECT * FROM field_templates
      WHERE item_template_id = ${item_template_id}
   `;

	return fieldTemplates;
};
