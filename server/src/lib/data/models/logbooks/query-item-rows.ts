import { sqlConnection } from "@/db/init";
import type { ItemRow } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryItemRowsByLog: QueryFunction<
	{ log_id: ID },
	Promise<ItemRow[]>
> = async ({ sql = sqlConnection, log_id }) => {
	const itemRows = await sql<[ItemRow]>`
      SELECT * FROM item_rows
      WHERE log_id = ${log_id}
   `;

	return itemRows;
};

export const queryItemRows: QueryFunction<{ user_id: ID }, Promise<ItemRow[]>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	const itemRows = await sql<[ItemRow]>`
      SELECT * FROM item_rows
      WHERE user_id = ${user_id}
   `;

	return itemRows;
};
