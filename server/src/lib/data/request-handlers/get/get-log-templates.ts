import { groupById } from "@/lib/data/models/group-by-id";
import {
	queryLogTemplate,
	queryLogTemplates,
	queryLogTemplatesByLogbook,
} from "@/lib/data/models/logbooks/query-log-templates";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express";

export const getLogTemplate: RequestHandler = async (req, res) => {
	const log_template_id = +req.params.log_template_id;

	const logTemplate = await queryLogTemplate({ log_template_id });

	res.json(logTemplate);
};

export const getLogTemplates: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const logTemplates = await queryLogTemplates({ user_id });
		const byId = groupById(logTemplates, "log_template_id");

		res.json({ byId });
	}
};

export const getLogTemplatesByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;

	const logTemplates = await queryLogTemplatesByLogbook({ logbook_id });
	const byId = groupById(logTemplates, "log_template_id");
	res.json({ byId });
};
