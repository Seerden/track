import { getItemsForTemplate } from "@/components/logbooks/LogDetail/get-items";
import type { ItemSectionProps } from "@/components/logbooks/LogDetail/ItemSection";
import type { Item, ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";

/** Helper for LogDetail that wrangles data into the correct shape to render
 * `ItemSection`s. */
export function getSectionsForLog({
	itemTemplates,
	items,
	log_id,
	logbook_id
}: {
	itemTemplates: ItemTemplate[];
	items: Item[];
	log_id: ID;
	logbook_id: ID;
}) {
	const sections: ItemSectionProps[] = itemTemplates.map((template) => {
		return {
			itemTemplate: template,
			items: getItemsForTemplate({
				item_template_id: +template.item_template_id,
				items
			}),
			logbook_id,
			log_id
		};
	});

	return sections;
}
