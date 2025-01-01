import { sqlConnection } from "@/db/init";
import { insertFieldTemplate } from "@/lib/data/models/logbooks/insert-field-template";
import { insertItemTemplate } from "@/lib/data/models/logbooks/insert-item-template";
import type {
	FieldTemplate,
	ItemTemplate,
	NewFieldTemplate,
	NewItemTemplate,
} from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const createItemTemplate: QueryFunction<
	{
		newItemTemplate: NewItemTemplate;
		newFieldTemplates: NewFieldTemplate[];
		user_id: ID;
	},
	Promise<{
		itemTemplate: ItemTemplate;
		fieldTemplates: FieldTemplate[];
	}>
> = async ({ sql = sqlConnection, newItemTemplate, newFieldTemplates, user_id }) => {
	const result = await sql.begin(async (q) => {
		const itemTemplate = await insertItemTemplate({ sql: q, newItemTemplate, user_id });

		const fieldTemplates = await Promise.all(
			newFieldTemplates.map(async (fieldTemplate) => {
				return await insertFieldTemplate({
					sql: q,
					newFieldTemplate: {
						...fieldTemplate,
						user_id,
						item_template_id: itemTemplate.item_template_id,
					},
				});
			}),
		);

		return {
			itemTemplate,
			fieldTemplates,
		};
	});

	return result;
};
