import { groupById } from "@/lib/data/models/group-by-id";
import {
	queryItems,
	queryItemsByLogbook,
	queryItemsByTemplate,
} from "@/lib/data/models/logbooks/query-items";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express";

export const getItemsByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;
	const items = await queryItemsByLogbook({ logbook_id });
	const byId = groupById(items, "item_id");

	res.json({ byId });
};

export const getItems: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const items = await queryItems({ user_id });
		const byId = groupById(items, "item_id");

		res.json({ byId });
	}
};

/** Request handler for `/data/logbook/items/template/:item_template_id/items
 * @todo I don't like this endpoint. Maybe the /template/ part can be removed?
 */
export const getItemsByTemplate: RequestHandler = async (req, res) => {
	const item_template_id = +req.params.item_template_id;
	const items = await queryItemsByTemplate({ item_template_id });
	const byId = groupById(items, "item_id");

	res.json({ byId });
};
