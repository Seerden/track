import { insertLogTemplate } from "@/lib/data/models/logbooks/insert-log-template";
import type { NewLogTemplate } from "@t/data/logbook.new.types";
import type { RequestHandler } from "express";

export const postLogTemplate: RequestHandler = async (req, res) => {
	const { newLogTemplate } = req.body as { newLogTemplate: NewLogTemplate };

	const logTemplate = await insertLogTemplate({ newLogTemplate });

	res.json(logTemplate);
};
