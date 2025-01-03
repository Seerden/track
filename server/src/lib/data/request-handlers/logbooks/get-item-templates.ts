import { groupById } from "@/lib/data/models/group-by-id";
import { queryItemTemplatesByLogbook } from "@/lib/data/models/logbooks/query-item-templates";
import type { RequestHandler } from "express";

export const getItemTemplatesByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = req.params.logbook_id;
	const itemTemplates = await queryItemTemplatesByLogbook({ logbook_id });
	const byId = groupById(itemTemplates, "item_template_id");

	res.json({ byId });
};
