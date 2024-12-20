import { sqlConnection } from "@/db/init";
import type { ItemRow, NewItemRow } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const insertItemRow: QueryFunction<
	{ newItemRow: NewItemRow },
	Promise<ItemRow>
> = async ({ sql = sqlConnection, newItemRow }) => {
	const [insertedItemRow] = await sql<[ItemRow]>`
      INSERT INTO item_rows ${sql(newItemRow)}
      RETURNING *
   `;

	return insertedItemRow;
};
