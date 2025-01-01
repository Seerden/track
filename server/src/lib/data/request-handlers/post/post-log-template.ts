import { insertLogTemplate } from "@/lib/data/models/logbooks/insert-log-template";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { NewLogTemplateInput } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/template`. */
export const postLogTemplate: RequestHandler = async (req, res) => {
	const { newLogTemplate } = req.body as NewLogTemplateInput;

	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const logTemplate = await insertLogTemplate({ newLogTemplate, user_id });

		res.json(logTemplate);
	}
};
