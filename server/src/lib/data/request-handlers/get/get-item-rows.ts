import { groupById } from "@/lib/data/models/group-by-id";
import {
	queryItemRows,
	queryItemRowsByLog,
	queryItemRowsByLogItem,
} from "@/lib/data/models/logbooks/query-item-rows";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express-serve-static-core";

/** Request handler for `/data/logbooks/items/rows`. */
export const getItemRows: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const itemRows = await queryItemRows({ user_id });
		const byId = groupById(itemRows, "item_row_id");

		res.json({ byId });
	}
};

/** Request handler for `/data/logbooks/log/:log_id/items/rows`. */
export const getItemRowsByLog: RequestHandler = async (req, res) => {
	const log_id = +req.params.log_id;
	const itemRows = await queryItemRowsByLog({ log_id });
	const byId = groupById(itemRows, "item_row_id");

	res.json({ byId });
};

/** Request handler for `/data/logbook/log/:log_id/items/:item_id/rows` */
export const getItemRowsByLogItem: RequestHandler = async (req, res) => {
	const log_id = +req.params.log_id;
	const item_id = +req.params.item_id;
	const itemRows = await queryItemRowsByLogItem({ log_id, item_id });
	const byId = groupById(itemRows, "item_row_id");

	res.json({ byId });
};
