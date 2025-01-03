import { sqlConnection } from "@/db/init";
import type { ItemTemplate } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Get all item_templates for the given logbook. */
export const queryItemTemplatesByLogbook: QueryFunction<
	{ logbook_id: ID },
	Promise<ItemTemplate[]>
> = async ({ sql = sqlConnection, logbook_id }) => {
	const itemTemplates = await sql<[ItemTemplate]>`
      SELECT * FROM item_templates
      WHERE logbook_id = ${logbook_id}
   `;

	return itemTemplates;
};

/** Query a single item template by its ID.
 * @todo see below. */
export const queryItemTemplateById: QueryFunction<
	{ item_template_id: ID },
	Promise<ItemTemplate>
> = async ({ sql = sqlConnection, item_template_id }) => {
	const [itemTemplate] = await sql<[ItemTemplate]>`
      SELECT * FROM item_templates
      WHERE item_template_id = ${item_template_id}
   `;

	return itemTemplate;
};

/** Query multiple item_templates by their ID.
 * @todo combine queryItemTemplateById with this function.
 * @todo do we need to use sql.array(ids) here? Or is that only when we do
 * `where item_template_id = ANY(...)`?
 */
export const queryItemTemplatesById: QueryFunction<
	{ ids: ID[] },
	Promise<ItemTemplate[]>
> = async ({ sql = sqlConnection, ids }) => {
	const itemTemplates = await sql<[ItemTemplate]>`
      SELECT * FROM item_templates
      WHERE item_template_id in ${sql(ids)}
   `;

	return itemTemplates;
};
