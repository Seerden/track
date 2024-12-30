import { groupById } from "@/lib/data/models/group-by-id";
import {
	queryItems,
	queryItemsByLogbook,
	queryItemsByTemplate,
} from "@/lib/data/models/logbooks/query-items";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/:logbook_id/items`. */
export const getItemsByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;
	const items = await queryItemsByLogbook({ logbook_id });
	const byId = groupById(items, "item_id");

	res.json({ byId });
};

/** Request handler for `/data/logbooks/items`. */
export const getItems: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	}

	const items = await queryItems({ user_id });
	const byId = groupById(items, "item_id");

	res.json({ byId });
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
