import { sqlConnection } from "@/db/init";
import type { Logbook, NewLogbook } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const insertLogbook: QueryFunction<
	{ newLogbook: NewLogbook },
	Promise<Logbook>
> = async ({ sql = sqlConnection, newLogbook }) => {
	const [insertedLogbook] = await sql<[Logbook]>`
      INSERT INTO logbooks ${sql(newLogbook)}
      RETURNING *
   `;

	return insertedLogbook;
};
