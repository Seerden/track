import { updateLog } from "@/lib/data/models/logbooks/update-log";
import type { Log } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/:logbook_id`. */
export const putLog: RequestHandler = async (req, res) => {
	const { log } = req.body as { log: Log };
	// TODO: log_id is a param, but we're not directly using it. This is a flaw
	// in the API design (this issue is also in putLogbook)
	const log_id = req.params.log_id;

	const updatedLog = await updateLog({ log });
	res.json(updatedLog);
};
