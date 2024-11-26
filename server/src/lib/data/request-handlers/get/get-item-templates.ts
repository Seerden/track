import { queryItemTemplatesByLogbook } from "@/lib/data/models/logbooks/query-item-templates";
import type { RequestHandler } from "express";

export const getItemTemplatesByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;

	res.json(await queryItemTemplatesByLogbook({ logbook_id }));
};
