import { queryItemsByLogbook } from "@/lib/data/models/logbooks/query-items";
import type { RequestHandler } from "express";

export const getItemsByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;

	res.json(await queryItemsByLogbook({ logbook_id }));
};
