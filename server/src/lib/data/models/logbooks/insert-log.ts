import { sqlConnection } from "@/db/init";
import { queryLogTemplate } from "@/lib/data/models/logbooks/query-log-templates";
import type { Log, NewLogInput } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const insertLog: QueryFunction<NewLogInput, Promise<Log>> = async ({
	sql = sqlConnection,
	newLog,
	logTemplateId,
}) => {
	const insertedLog = await sql.begin(async (q) => {
		const template = logTemplateId
			? await queryLogTemplate({ sql: q, log_template_id: logTemplateId })
			: null;
		const newLogWithLayout = newLog;
		if (template) {
			newLogWithLayout.layout = template.layout;
		}

		const [insertedLog] = await q<[Log]>`
         INSERT INTO logs ${sql(newLogWithLayout)}
         RETURNING *
      `;

		return insertedLog;
	});

	return insertedLog;
};
