import { groupById } from "@/lib/data/models/group-by-id";
import { queryFieldTemplatesByItemTemplate } from "@/lib/data/models/logbooks/query-field-templates";
import { queryFieldValuesByLog } from "@/lib/data/models/logbooks/query-field-values";
import { queryItemRowsByLog } from "@/lib/data/models/logbooks/query-item-rows";
import { queryItemTemplateById } from "@/lib/data/models/logbooks/query-item-templates";
import { queryItemById } from "@/lib/data/models/logbooks/query-items";
import {
	queryLogById,
	queryLogsByLogbook,
	queryLogsByUser,
} from "@/lib/data/models/logbooks/query-logs";
import type { FieldTemplate, FieldValue, Item, ItemRow } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Queries all logs by user. */
export const getLogs: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	} // TODO: same as everywhere else...

	const logs = await queryLogsByUser({ user_id });
	const byId = groupById(logs, "log_id");

	res.json({ byId });
};

/** Queries all logs for a given logbook. */
export const getLogsByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;
	const logs = await queryLogsByLogbook({ logbook_id });
	const byId = groupById(logs, "log_id");

	res.json({ byId });
};

type Field = {
	template: FieldTemplate;
	value: FieldValue;
};
type Row = ItemRow & { item: Item } & { fields: Field[] };
type Rows = Row[];
type Section = Rows[];

// build the entire set of data that we need to display a log card in the
// client. I'm not sure if this is how we actually want to do it, but it's an
// experiment to see how I feel about keeping client-side logic to a minimum.
export const getLogCardById: RequestHandler = async (req, res) => {
	const log_id = +req.params.log_id;

	const log = await queryLogById({ log_id });
	const itemRows = await queryItemRowsByLog({ log_id });
	const fieldValues = await queryFieldValuesByLog({ log_id });
	const uniqueItemIds = Array.from(new Set(itemRows.map((row) => row.item_id)));
	const items = await Promise.all(
		uniqueItemIds.map(async (item_id) => queryItemById({ item_id })),
	);
	const uniqueItemTemplateIds = Array.from(
		new Set(items.map((item) => item.item_template_id)),
	);
	const itemTemplates = await Promise.all(
		uniqueItemTemplateIds.map(async (item_template_id) =>
			queryItemTemplateById({ item_template_id }),
		),
	);
	const uniqueItemTemplates = Array.from(new Set(itemTemplates));

	// Each section corresponds to an item template and all of the items that
	// descend from it along with their filled-out fields.
	const sections = await Promise.all(
		uniqueItemTemplates.map(async ({ item_template_id }) => {
			const _items = items.filter((i) => i.item_template_id === item_template_id);
			const fieldTemplates = await queryFieldTemplatesByItemTemplate({
				item_template_id,
			});

			// Find item rows for each item, and include the fields for each row.
			return _items.map((item) => {
				const _itemRows = itemRows.filter(
					(itemRow) => item.item_id === itemRow.item_id,
				);

				return _itemRows.map((ir) => {
					const _fieldValues = fieldValues.filter(
						(fv) => fv.item_row_id === ir.item_row_id,
					);

					const fields = fieldTemplates.map((ft) => ({
						template: ft,
						value: _fieldValues.find(
							(fv) => fv.field_template_id === ft.field_template_id,
						) as FieldValue,
					})) as Field[];

					return {
						...ir,
						item,
						fields,
					};
				});
			});
		}),
	);

	res.json({
		log,
		sections,
	});
};
