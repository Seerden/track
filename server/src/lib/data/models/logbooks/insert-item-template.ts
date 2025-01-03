import { sqlConnection } from "@/db/init";
import type { ItemTemplate, NewItemTemplate } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const insertItemTemplate: QueryFunction<
	{ newItemTemplate: NewItemTemplate; user_id: ID },
	Promise<ItemTemplate>
> = async ({ sql = sqlConnection, newItemTemplate, user_id }) => {
	const withUserId = { ...newItemTemplate, user_id };

	const [insertedItemTemplate] = await sql<[ItemTemplate]>`
      INSERT INTO item_templates ${sql(withUserId)}
      RETURNING *
   `;

	return insertedItemTemplate;
};
