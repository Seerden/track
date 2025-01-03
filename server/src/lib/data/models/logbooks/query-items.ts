import { sqlConnection } from "@/db/init";
import type { Item } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
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
	const items = await sql<[Item]>`
      SELECT * FROM items
      WHERE user_id = ${user_id}
   `;

	return items;
};

/** Get all items that belong to the given template. */
export const queryItemsByTemplate: QueryFunction<
	{ item_template_id: ID },
	Promise<Item[]>
> = async ({ sql = sqlConnection, item_template_id }) => {
	const items = await sql<[Item]>`
      SELECT * FROM items
      WHERE item_template_id = ${item_template_id}
   `;

	return items;
};
