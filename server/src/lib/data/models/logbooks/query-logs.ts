import { sqlConnection } from "@/db/init";
import type { Log } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Get all of a single user's logs.
 * @todo @see https://github.com/Seerden/track/issues/177 */
export const queryLogsByUser: QueryFunction<{ user_id: ID }, Promise<Log[]>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	const logs = await sql<[Log]>`
      SELECT * FROM logs
      WHERE user_id=${user_id}
   `;

	return logs;
};

/** Get all logs belonging to the given logbook. */
export const queryLogsByLogbook: QueryFunction<
	{ logbook_id: ID },
	Promise<Log[]>
> = async ({ sql = sqlConnection, logbook_id }) => {
	const logs = await sql<[Log]>`
      SELECT * FROM logs
      WHERE logbook_id = ${logbook_id}
   `;

	return logs;
};

/** Get a single log by its ID. */
export const queryLogById: QueryFunction<{ log_id: ID }, Promise<Log>> = async ({
	sql = sqlConnection,
	log_id,
}) => {
	const [log] = await sql<[Log]>`
      SELECT * FROM logs
      WHERE log_id = ${log_id}
   `;

	return log;
};
