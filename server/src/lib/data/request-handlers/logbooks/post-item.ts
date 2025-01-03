import { insertItem } from "@/lib/data/models/logbooks/insert-item";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { NewItemInput } from "@shared/types/data/logbook.types";
import type { RequestHandler } from "express";

export const postItem: RequestHandler = async (req, res) => {
	const { newItem } = req.body as NewItemInput;

	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const item = await insertItem({ newItem, user_id });

		res.json(item);
	}
};
