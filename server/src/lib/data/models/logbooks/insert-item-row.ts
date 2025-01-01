import { sqlConnection } from "@/db/init";
import type { ItemRow, NewItemRow } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const insertItemRow: QueryFunction<
	{ newItemRow: NewItemRow; user_id: ID },
	Promise<ItemRow>
> = async ({ sql = sqlConnection, newItemRow, user_id }) => {
	const withUserId = { ...newItemRow, user_id };

	const [insertedItemRow] = await sql<[ItemRow]>`
      INSERT INTO item_rows ${sql(withUserId)}
      RETURNING *
   `;

	return insertedItemRow;
};
