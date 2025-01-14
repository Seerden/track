import {
	queryFields,
	queryFieldsByItemRow,
} from "@/lib/data/models/logbooks/query-fields";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express";

export const getFields: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const byId = await queryFields({ user_id });
		res.json({ byId });
	}
};

export const getFieldsByItemRow: RequestHandler = async (req, res) => {
	const item_row_id = req.params.item_row_id;

	const fields = await queryFieldsByItemRow({ item_row_id });

	res.json({ fields });
};
