import type { Item, ItemTemplate, Layout } from "@shared/types/data/logbook.types";
import type { ByIdMap, ID } from "@shared/types/data/utility.types";

export function computeItemTemplateSelection({
	layout,
	itemTemplatesById,
	itemTemplates
}: {
	layout?: Layout;
	itemTemplatesById?: ByIdMap<ItemTemplate>;
	itemTemplates?: ItemTemplate[];
}) {
	if (!layout || !itemTemplatesById || !itemTemplates) {
		return {
			included: [],
			excluded: []
		};
	}

	const layoutSectionIds = layout.map((section) => section.item_template_id) ?? [];

	const included = layoutSectionIds.reduce((acc, cur) => {
		const template = itemTemplatesById.get(cur);
		return template ? acc.concat(template) : acc;
	}, [] as ItemTemplate[]);

	const excluded = itemTemplates.filter(
		(template) =>
			!included.some((i) => i.item_template_id === template.item_template_id)
	);

	return {
		included,
		excluded
	};
}

export function computeItemSelection({
	layout,
	itemsById,
	items,
	item_template_id
}: {
	layout?: Layout;
	itemsById?: ByIdMap<Item>;
	items?: Item[];
	item_template_id?: ID;
}) {
	if (!layout || !itemsById || !items || !item_template_id) {
		return {
			included: [],
			excluded: []
		};
	}

	const layoutSectionItemIds =
		layout.find((section) => section.item_template_id === item_template_id)?.item_ids ??
		[];

	const included = layoutSectionItemIds.reduce((acc, cur) => {
		const item = itemsById.get(cur);
		return item ? acc.concat(item) : acc;
	}, [] as Item[]);

	const excluded = items.filter(
		(item) => !included.some((i) => i.item_id === item.item_id)
	);

	return {
		included,
		excluded
	};
}
