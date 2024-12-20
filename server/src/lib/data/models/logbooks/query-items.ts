import { sqlConnection } from "@/db/init";
import { queryLogbooksByUser } from "@/lib/data/models/logbooks/query-logbooks";
import type { Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Get all items for the given logbook. */
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

/** Get a single item by its ID. */
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

/** Get multiple items by their IDs.
 * @todo same question as elsewhere, do we need to use `sql.array(ids)` here? */
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

/** Get all of a single user's items.
 * @todo @see https://github.com/Seerden/track/issues/177 */
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
