import { sqlConnection } from "@/db/init";
import type { Log, NewLog } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const insertLog: QueryFunction<{ newLog: NewLog }, Promise<Log>> = async ({
	sql = sqlConnection,
	newLog,
}) => {
	const [insertedLog] = await sql<[Log]>`
      INSERT INTO logs ${sql(newLog)}
      RETURNING *
   `;

	return insertedLog;
};
