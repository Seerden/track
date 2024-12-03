import { sqlConnection } from "@/db/init";
import { queryLogsByUser } from "@/lib/data/models/logbooks/query-logs";
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
	const logs = await queryLogsByUser({ user_id, sql });
	const logIds = logs.map((log) => +log.log_id);

	const itemRows = await sql<[ItemRow]>`
      SELECT * FROM item_rows
      WHERE log_id = ANY(${sql.array(logIds)}::bigint[])
   `;

	return itemRows;
};
