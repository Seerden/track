import { sqlConnection } from "@/db/init";
import type { LogTemplate, NewLogTemplate } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const insertLogTemplate: QueryFunction<
	{ newLogTemplate: NewLogTemplate; user_id: ID },
	Promise<LogTemplate>
> = async ({ sql = sqlConnection, newLogTemplate, user_id }) => {
	const withUserId = { ...newLogTemplate, user_id };
	const [insertedLogTemplate] = await sql<[LogTemplate]>`
      INSERT INTO log_templates ${sql(withUserId)}
      RETURNING *
   `;

	return insertedLogTemplate;
};
