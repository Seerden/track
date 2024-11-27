import { sqlConnection } from "@/db/init";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/**
 * Delete a single itemTemplate by its ID.
 * @todo similar to with removeLogById,
 * this also deletes the following records:
 * - items
 * - field_templates
 *   I think this makes sense. Items shouldn't exist without a template (squat
 *   makes no sense without a lift template), and field templates belong to the
 *   item template directly, so those should cascade.
 */
export const removeItemTemplateById: QueryFunction<
	{ item_template_id: ID },
	Promise<Pick<ItemTemplate, "item_template_id">>
> = async ({ sql = sqlConnection, item_template_id }) => {
	const [deleted] = await sql<[Pick<ItemTemplate, "item_template_id">]>`
      DELETE FROM item_templates
      WHERE item_template_id = ${item_template_id}
      RETURNING item_template_id
   `;

	return deleted;
};
