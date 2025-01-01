import { sqlConnection } from "@/db/init";
import { queryLogTemplate } from "@/lib/data/models/logbooks/query-log-templates";
import type { Log, NewLogInput } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const insertLog: QueryFunction<
	NewLogInput & { user_id: ID },
	Promise<Log>
> = async ({ sql = sqlConnection, newLog, logTemplateId, user_id }) => {
	const insertedLog = await sql.begin(async (q) => {
		const template = logTemplateId
			? await queryLogTemplate({ sql: q, log_template_id: logTemplateId })
			: null;
		const newLogWithLayout = newLog;
		if (template) {
			newLogWithLayout.layout = template.layout;
		}

		const withUserId = { ...newLogWithLayout, user_id };

		const [insertedLog] = await q<[Log]>`
         INSERT INTO logs ${sql(withUserId)}
         RETURNING *
      `;

		return insertedLog;
	});

	return insertedLog;
};
