import { insertLogbook } from "@/lib/data/models/logbooks/insert-logbook";
import type { NewLogbookInput } from "@shared/types/data/logbook.types";
import type { RequestHandler } from "express";

export const postLogbook: RequestHandler = async (req, res) => {
	const { newLogbook } = req.body as NewLogbookInput;
	const logbook = await insertLogbook({ newLogbook });
	res.json(logbook);
};
