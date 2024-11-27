import { sqlConnection } from "@/db/init";
import type { LogTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryLogTemplates: QueryFunction<
	{ user_id: ID },
	Promise<LogTemplate[]>
> = async ({ sql = sqlConnection, user_id }) => {
	const logTemplates = await sql<[LogTemplate]>`
      SELECT * FROM log_templates
      WHERE user_id = ${user_id}
   `;

	return logTemplates;
};

export const queryLogTemplatesByLogbook: QueryFunction<
	{ logbook_id: ID },
	Promise<LogTemplate[]>
> = async ({ sql = sqlConnection, logbook_id }) => {
	const logTemplates = await sql<[LogTemplate]>`
      SELECT * FROM log_templates
      WHERE logbook_id = ${logbook_id}
   `;

	return logTemplates;
};
