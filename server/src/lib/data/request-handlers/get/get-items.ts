import { groupById } from "@/lib/data/models/group-by-id";
import { queryItemsByLogbook } from "@/lib/data/models/logbooks/query-items";
import type { RequestHandler } from "express";

export const getItemsByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;
	const items = await queryItemsByLogbook({ logbook_id });
	const byId = groupById(items, "item_id");

	res.json({ byId });
};
