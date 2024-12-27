import { updateLogbook } from "@/lib/data/models/logbooks/update-logbook";
import type { Logbook } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/:logbook_id`. */
export const putLogbook: RequestHandler = async (req, res) => {
	const { logbook } = req.body as { logbook: Logbook };
	const logbook_id = req.params.logbook_id; // TODO: the logbook_id is a param, but we're not directly using it. This is a flaw in the API design.

	const updatedLogbook = await updateLogbook({ logbook });
	res.json(updatedLogbook);
};
