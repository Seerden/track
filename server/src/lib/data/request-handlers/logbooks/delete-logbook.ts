import { removeLogbookById } from "@/lib/data/models/logbooks/remove-logbook";
import type { RequestHandler } from "express";

export const deleteLogbook: RequestHandler = async (req, res) => {
	const logbook_id = req.params.logbook_id;

	// TODO: parse the id properly using a regex -- or zod

	res.json(await removeLogbookById({ logbook_id }));
};
