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
