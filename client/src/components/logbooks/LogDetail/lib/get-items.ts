import type { Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";

/** Extract the items from `items` that come from the given `item_template`.
 * @todo this should not be necessary if we only get the items we need from the server.
 * Or, if this _is_ necesary, we should put this function inside a data hook
 * that combines this logic with the result from query hook. */
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
