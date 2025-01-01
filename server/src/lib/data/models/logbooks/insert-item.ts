import { sqlConnection } from "@/db/init";
import type { Item, NewItem } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const insertItem: QueryFunction<
	{ newItem: NewItem; user_id: ID },
	Promise<Item>
> = async ({ sql = sqlConnection, newItem, user_id }) => {
	const withUserId = { ...newItem, user_id };

	const [insertedItem] = await sql<[Item]>`
      INSERT INTO items ${sql(withUserId)}
      RETURNING *
   `;

	return insertedItem;
};
