import { sqlConnection } from "@/db/init";
import type { Logbook } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const removeLogbookById: QueryFunction<
	{ logbook_id: ID },
	Promise<Pick<Logbook, "logbook_id">>
> = async ({ sql = sqlConnection, logbook_id }) => {
	const [deleted] = await sql<[Pick<Logbook, "logbook_id">]>`
      DELETE FROM logbooks
      WHERE logbook_id = ${logbook_id}
      RETURNING logbook_id
   `;

	return deleted;
};
