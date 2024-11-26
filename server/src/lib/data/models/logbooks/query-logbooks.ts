import { sqlConnection } from "@/db/init";
import type { Logbook } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryLogbooksByUser: QueryFunction<{ user_id: ID }, Promise<[Logbook]>> = ({
	sql = sqlConnection,
	user_id,
}) => {
	return sql<[Logbook]>`
      SELECT * FROM logbooks
      WHERE user_id = ${user_id}
   `;
};

export const queryLogbookById: QueryFunction<
	{ logbook_id: ID },
	Promise<Logbook>
> = async ({ sql = sqlConnection, logbook_id }) => {
	const [logbook] = await sql<[Logbook]>`
      SELECT * FROM logbooks
      WHERE logbook_id = ${logbook_id}
   `;

	return logbook;
};
