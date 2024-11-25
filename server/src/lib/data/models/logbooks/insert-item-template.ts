import { sqlConnection } from "@/db/init";
import type { ItemTemplate, NewItemTemplate } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const insertItemTemplate: QueryFunction<
	{ newItemTemplate: NewItemTemplate },
	Promise<ItemTemplate>
> = async ({ sql = sqlConnection, newItemTemplate }) => {
	const [insertedItemTemplate] = await sql<[ItemTemplate]>`
      INSERT INTO item_templates ${sql(newItemTemplate)}
      RETURNING *
   `;

	return insertedItemTemplate;
};
