import { groupById } from "@/lib/data/models/group-by-id";
import {
	queryLogsByLogbook,
	queryLogsByUser,
} from "@/lib/data/models/logbooks/query-logs";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbooks/logs`. */
export const getLogs: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	} // TODO: same as everywhere else...

	const logs = await queryLogsByUser({ user_id });
	const byId = groupById(logs, "log_id");

	res.json({ byId });
};

/** Request handler for `/data/logbook/:logbook_id/logs`. */
export const getLogsByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;
	const logs = await queryLogsByLogbook({ logbook_id });
	const byId = groupById(logs, "log_id");

	res.json({ byId });
};

// Below is (as described) an experimental request handler to get all the data
// for a given log card by log_id. This is not how I'm going to implement the
// initial version of the UI for a log card, but I will leave it here for a
// little bit for quick reference while I'm building v1 for the UI. That will
// either implement this, or we can safely discard it.

// type Field = {
// 	template: FieldTemplate;
// 	value: FieldValue;
// };
// type Row = ItemRow & { item: Item } & { fields: Field[] };
// type Rows = Row[];
// type Section = Rows[];

// // build the entire set of data that we need to display a log card in the
// // client. I'm not sure if this is how we actually want to do it, but it's an
// // experiment to see how I feel about keeping client-side logic to a minimum.
// export const getLogCardById: RequestHandler = async (req, res) => {
// 	const log_id = +req.params.log_id;

// 	const log = await queryLogById({ log_id });
// 	const itemRows = await queryItemRowsByLog({ log_id });
// 	const fieldValues = await queryFieldValuesByLog({ log_id });
// 	const items = await queryItemsById({ ids: itemRows.map((row) => row.item_id) });
// 	const itemTemplates = await queryItemTemplatesById({
// 		ids: items.map((item) => item.item_template_id),
// 	});

// 	// Each section corresponds to an item template and all of the items that
// 	// descend from it along with their filled-out fields.
// 	const sections = await Promise.all(
// 		itemTemplates.map(async ({ item_template_id }) => {
// 			const _items = items.filter((i) => i.item_template_id === item_template_id);
// 			const fieldTemplates = await queryFieldTemplatesByItemTemplate({
// 				item_template_id,
// 			});

// 			// Find item rows for each item, and include the fields for each row.
// 			return _items.map((item) => {
// 				const _itemRows = itemRows.filter(
// 					(itemRow) => item.item_id === itemRow.item_id,
// 				);

// 				return _itemRows.map((ir) => {
// 					const _fieldValues = fieldValues.filter(
// 						(fv) => fv.item_row_id === ir.item_row_id,
// 					);

// 					const fields = fieldTemplates.map((ft) => ({
// 						template: ft,
// 						value: _fieldValues.find(
// 							(fv) => fv.field_template_id === ft.field_template_id,
// 						) as FieldValue,
// 					})) as Field[];

// 					return {
// 						...ir,
// 						item,
// 						fields,
// 					};
// 				});
// 			});
// 		}),
// 	);

// 	res.json({
// 		log,
// 		sections,
// 	});
// };
