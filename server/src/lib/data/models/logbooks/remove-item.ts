import { sqlConnection } from "@/db/init";
import type { Item } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Deletes an item from the database by id.
 * Because of cascading, this may also delete related records:
 * - item_rows
 */
export const removeItemById: QueryFunction<
	{ item_id: ID },
	Promise<Pick<Item, "item_id">>
> = async ({ sql = sqlConnection, item_id }) => {
	const [deleted] = await sql<[Pick<Item, "item_id">]>`
      DELETE FROM items
      WHERE item_id = ${item_id}
      RETURNING item_id
   `;

	return deleted;
};
