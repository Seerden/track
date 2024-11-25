import { sqlConnection } from "@/db/init";
import type { FieldTemplate, NewFieldTemplate } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const insertFieldTemplate: QueryFunction<
	{ newFieldTemplate: NewFieldTemplate },
	Promise<FieldTemplate>
> = async ({ sql = sqlConnection, newFieldTemplate }) => {
	const [insertedFieldTemplate] = await sql<[FieldTemplate]>`
      INSERT INTO field_templates ${sql(newFieldTemplate)}
      RETURNING *
   `;

	return insertedFieldTemplate;
};
