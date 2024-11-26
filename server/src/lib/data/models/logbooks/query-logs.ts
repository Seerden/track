import { sqlConnection } from "@/db/init";
import type { Log } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryLogsByUser: QueryFunction<{ user_id: ID }, Promise<Log[]>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	const logs = await sql<[Log]>`
      SELECT * FROM logs
      WHERE user_id = ${user_id}
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
