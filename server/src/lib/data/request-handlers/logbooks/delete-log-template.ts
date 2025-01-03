import { removeLogTemplateById } from "@/lib/data/models/logbooks/remove-log-template";
import type { RequestHandler } from "express";

export const deleteLogTemplate: RequestHandler = async (req, res) => {
	const log_template_id = +req.params.log_template_id;

	// TODO: parse the id properly using a regex -- or zod

	res.json(await removeLogTemplateById({ log_template_id }));
};
