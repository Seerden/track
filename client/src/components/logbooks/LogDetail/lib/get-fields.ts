import type { Field, Item } from "@t/data/logbook.types";

/** Given an `item` and a list of `fields`, return the fields that belong to the
 * item.
 * @todo I think it would be much better if we integrated this into a hook that
 * combines this function with the queries themselves, so we can get everything
 * in one place. The logic is coupled anyway, because we probably wouldn't call
 * this function if we had no clue whether `item` and `fields` were related. */
export function getFieldsForItem({
	item,
	fields
}: {
	item?: Item | undefined;
	fields: Field[];
}) {
	if (!item || !fields.length) return [];
	const fieldsForItem = fields.filter(
		// @see issue #175
		(field) => +field.item_template_id === +item.item_template_id
	);
	return fieldsForItem;
}
