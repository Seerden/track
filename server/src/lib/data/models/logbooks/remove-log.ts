import { sqlConnection } from "@/db/init";
import type { Log } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/**
 * Delete a single log by its ID. This cascade deletes the following related records:
 * - item_rows
 * - field_values
 */
export const removeLogById: QueryFunction<
	{ log_id: ID },
	Promise<Pick<Log, "log_id">>
> = async ({ sql = sqlConnection, log_id }) => {
	const [deleted] = await sql<[Pick<Log, "log_id">]>`
      DELETE FROM logs
      WHERE log_id = ${log_id}
      RETURNING log_id
   `;

	return deleted;
};
