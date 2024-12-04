import { insertLogTemplate } from "@/lib/data/models/logbooks/insert-log-template";
import type { NewLogTemplateInput } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/template`. */
export const postLogTemplate: RequestHandler = async (req, res) => {
	const { newLogTemplate } = req.body as NewLogTemplateInput;

	const logTemplate = await insertLogTemplate({ newLogTemplate });

	res.json(logTemplate);
};
