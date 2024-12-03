import { sqlConnection } from "@/db/init";
import { queryLogbooksByUser } from "@/lib/data/models/logbooks/query-logbooks";
import type { Log } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryLogsByUser: QueryFunction<{ user_id: ID }, Promise<Log[]>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	const logbooks = await queryLogbooksByUser({ user_id, sql });
	const logbookIds = logbooks.map((logbook) => +logbook.logbook_id);

	const logs = await sql<[Log]>`
      SELECT * FROM logs
      WHERE logbook_id = ANY(${sql.array(logbookIds)}::bigint[])
   `;

	return logs;
};

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
