import type { Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";

export function getItemsForTemplate({
	item_template_id,
	items
}: {
	item_template_id: ID;
	items: Item[];
}) {
	// TODO: see #175 -- don't want to have to parse the id
	return items.filter((item) => +item.item_template_id === +item_template_id);
}
