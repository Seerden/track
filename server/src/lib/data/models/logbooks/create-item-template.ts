import { sqlConnection } from "@/db/init";
import { insertFieldTemplate } from "@/lib/data/models/logbooks/insert-field-template";
import { insertItemTemplate } from "@/lib/data/models/logbooks/insert-item-template";
import type { NewFieldTemplate, NewItemTemplate } from "@t/data/logbook.new.types";
import type { FieldTemplate, ItemTemplate } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const createItemTemplate: QueryFunction<
	{
		newItemTemplate: NewItemTemplate;
		newFieldTemplates: NewFieldTemplate[];
	},
	Promise<{
		itemTemplate: ItemTemplate;
		fieldTemplates: FieldTemplate[];
	}>
> = async ({ sql = sqlConnection, newItemTemplate, newFieldTemplates }) => {
	const result = await sql.begin(async (q) => {
		const itemTemplate = await insertItemTemplate({ sql: q, newItemTemplate });

		const fieldTemplates = await Promise.all(
			newFieldTemplates.map(async (fieldTemplate) => {
				return await insertFieldTemplate({
					sql: q,
					newFieldTemplate: {
						...fieldTemplate,
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
