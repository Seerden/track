import { sqlConnection } from "@/db/init";
import type { LogTemplate } from "@t/data/logbook.types";
import type { ID, Nullable } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryLogTemplate: QueryFunction<
	{ log_template_id: ID },
	Promise<Nullable<LogTemplate>>
> = async ({ sql = sqlConnection, log_template_id }) => {
	const [logTemplate] = await sql<[LogTemplate]>`
      SELECT * FROM log_templates
      WHERE log_template_id = ${log_template_id}
   `;

	return logTemplate;
};

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
