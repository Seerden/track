import { sqlConnection } from "@/db/init";
import { queryLogbooksByUser } from "@/lib/data/models/logbooks/query-logbooks";
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

export const queryItemsById: QueryFunction<{ ids: ID[] }, Promise<Item[]>> = async ({
	sql = sqlConnection,
	ids,
}) => {
	const items = await sql<[Item]>`
      SELECT * FROM items
      WHERE item_id IN (${ids})
   `;

	return items;
};

export const queryItems: QueryFunction<{ user_id: ID }, Promise<Item[]>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	const logbookIds = (await queryLogbooksByUser({ user_id })).map(
		({ logbook_id }) => logbook_id,
	);

	const items = await sql<[Item]>`
      SELECT * FROM items
      WHERE logbook_id = ANY(${sql.array(logbookIds)}::bigint[])
   `;

	return items;
};
