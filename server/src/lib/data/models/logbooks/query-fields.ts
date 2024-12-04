import { sqlConnection } from "@/db/init";
import { queryLogbooksByUser } from "@/lib/data/models/logbooks/query-logbooks";
import type { Field, FieldTemplate, FieldValue } from "@t/data/logbook.types";
import type { ById, ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Get all fields belonging to a user. A field is a fieldTemplate along with
 * all of the fieldValues that belong to it.
 * @todo the queries here are extremely inefficient for the sake of readability
 * of the initial logbooks implementation. Use joins inside queries, use better
 * early escape syntax, and extrect all subfunctions (like the fieldTemplates
 * reducer) to testable functions.
 * @see https://github.com/Seerden/track/issues/177
 **/
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
			// TODO: see #155
			(value) => +value.field_template_id === +template.field_template_id,
		);

		// TODO: do not destructure, use Object.assign({}, ...)
		acc[template.field_template_id] = {
			...template,
			values,
		};

		return acc;
	}, {} as ById<Field>);
};
