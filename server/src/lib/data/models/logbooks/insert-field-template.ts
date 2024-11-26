import { sqlConnection } from "@/db/init";
import type {
   FieldTemplate,
   NewFieldTemplate,
   NewFieldTemplateWithId,
} from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

type B = NewFieldTemplate;
type C = NewFieldTemplateWithId;

export const insertFieldTemplate: QueryFunction<
	{
		newFieldTemplate: NewFieldTemplateWithId;
	},
	Promise<FieldTemplate>
> = async ({ sql = sqlConnection, newFieldTemplate }) => {
	const [insertedFieldTemplate] = await sql<[FieldTemplate]>`
      INSERT INTO field_templates ${sql(newFieldTemplate)}
      RETURNING *
   `;

	return insertedFieldTemplate;
};
