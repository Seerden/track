import type { ItemRow } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";

/** Helper for ItemSection that gets only the relevant rows for a section
 * @todo see note from (among others) `./get-items.ts`. */
export function getRowsForItem({
	itemRows,
	item_id,
	log_id
}: {
	itemRows: ItemRow[];
	item_id: ID;
	log_id: ID;
}) {
	if (!itemRows?.length) return [];

	return itemRows.filter(
		// TODO: see #175 -- don't want to have to parse the id
		(row) => +row.item_id === +item_id && +row.log_id === +log_id
	);
}
