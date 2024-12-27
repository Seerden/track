import { sqlConnection } from "@/db/init";
import type { Logbook } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

/** Set a single logbook's values to those in `logbook`. */
export const updateLogbook: QueryFunction<
	{ logbook: Logbook },
	Promise<Logbook>
> = async ({ sql = sqlConnection, logbook }) => {
	const { logbook_id, ...logbookWithoutId } = logbook;

	const [updatedLogbook] = await sql<[Logbook]>`
      UPDATE logbooks
      SET ${sql(logbookWithoutId)}
      WHERE logbook_id = ${logbook.logbook_id}
      RETURNING *
   `;

	return updatedLogbook;
};
