import { insertLogbook } from "@/lib/data/models/logbooks/insert-logbook";
import type { NewLogbookInput } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook`. */
export const postLogbook: RequestHandler = async (req, res) => {
	const { newLogbook } = req.body as NewLogbookInput;

	const logbook = await insertLogbook({ newLogbook });

	res.json(logbook);
};
