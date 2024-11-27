import { sqlConnection } from "@/db/init";
import type { Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryItemsByLogbook: QueryFunction<
	{ logbook_id: ID },
	Promise<Item[]>
> = async ({ sql = sqlConnection, logbook_id }) => {
	const items = await sql<[Item]>`
      SELECT * FROM items
      WHERE logbook_id = ${logbook_id}
   `;

	return items;
};

export const queryItemById: QueryFunction<{ item_id: ID }, Promise<Item>> = async ({
	sql = sqlConnection,
	item_id,
}) => {
	const [item] = await sql<[Item]>`
      SELECT * FROM items
      WHERE item_id = ${item_id}
   `;

	return item;
};
