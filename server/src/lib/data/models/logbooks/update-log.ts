import { sqlConnection } from "@/db/init";
import type { Log } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

/** Set a single Log's values to those in `log`. */
export const updateLog: QueryFunction<{ log: Log }, Promise<Log>> = async ({
	sql = sqlConnection,
	log,
}) => {
	// TODO: verify that every value in layout actually belongs to the user
	// TODO?: remove any values from the layout that no longer exist

	const { log_id, ...logWithoutId } = log;
	const [updatedLog] = await sql<[Log]>`
     UPDATE logs
     SET ${sql(logWithoutId)}
     WHERE log_id = ${log_id}
     RETURNING *
   `;

	return updatedLog;
};
