import { groupById } from "@/lib/data/models/group-by-id";
import {
	queryLogTemplates,
	queryLogTemplatesByLogbook,
} from "@/lib/data/models/logbooks/query-log-templates";
import type { RequestHandler } from "express";

export const getLogTemplates: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	} // TODO: same as elsewhere, should never happen because of middleware

	const logTemplates = await queryLogTemplates({ user_id });
	const byId = groupById(logTemplates, "log_template_id");

	res.json({ byId });
};

export const getLogTemplatesByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;

	const logTemplates = await queryLogTemplatesByLogbook({ logbook_id });
	const byId = groupById(logTemplates, "log_template_id");
	res.json({ byId });
};
