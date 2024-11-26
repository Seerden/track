import { sqlConnection } from "@/db/init";
import type { LogTemplate, NewLogTemplate } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const insertLogTemplate: QueryFunction<
	{ newLogTemplate: NewLogTemplate },
	Promise<LogTemplate>
> = async ({ sql = sqlConnection, newLogTemplate }) => {
	const [insertedLogTemplate] = await sql<[LogTemplate]>`
      INSERT INTO log_templates (
         logbook_id,
         name,
         layout
      ) values (
         ${newLogTemplate.logbook_id},
         ${newLogTemplate.name},
         ${sql.json(newLogTemplate.layout)}
      )
      RETURNING *
   `;

	return insertedLogTemplate;
};
