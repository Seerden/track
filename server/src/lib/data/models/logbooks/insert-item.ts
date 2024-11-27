import { sqlConnection } from "@/db/init";
import type { Item, NewItem } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const insertItem: QueryFunction<{ newItem: NewItem }, Promise<Item>> = async ({
	sql = sqlConnection,
	newItem,
}) => {
	const [insertedItem] = await sql<[Item]>`
      INSERT INTO items ${sql(newItem)}
      RETURNING *
   `;

	return insertedItem;
};
