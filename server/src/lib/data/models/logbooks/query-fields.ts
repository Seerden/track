import { sqlConnection } from "@/db/init";
import { queryLogbooksByUser } from "@/lib/data/models/logbooks/query-logbooks";
import type { Field, FieldTemplate, FieldValue } from "@t/data/logbook.types";
import type { ById, ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryFields: QueryFunction<{ user_id: ID }, Promise<ById<Field>>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	const { fieldTemplates, fieldValues } = await sql.begin(async (q) => {
		const logbooksByUser = await queryLogbooksByUser({ user_id, sql: q });
		const logbookIds = logbooksByUser.map((logbook) => +logbook.logbook_id);

		if (logbookIds.length === 0) {
			return {
				fieldTemplates: [] as FieldTemplate[],
				fieldValues: [] as FieldValue[],
			};
		}

		const fieldTemplates = await q<[FieldTemplate]>`
         SELECT * FROM field_templates
         WHERE logbook_id = ANY(${q.array(logbookIds)}::bigint[])
      `;

		const fieldTemplateIds = fieldTemplates.map(
			(template) => +template.field_template_id,
		);
		const fieldValues = await q<[FieldValue]>`
         SELECT * FROM field_values
         WHERE field_template_id = ANY(${q.array(fieldTemplateIds)}::bigint[])
      `;

		return {
			fieldTemplates,
			fieldValues,
		};
	});

	return fieldTemplates.reduce((acc, template) => {
		const values = fieldValues.filter(
			(value) => value.field_template_id === template.field_template_id,
		);

		acc[template.field_template_id] = {
			...template,
			values,
		};

		return acc;
	}, {} as ById<Field>);
};
