import { sqlConnection } from "@/db/init";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

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
