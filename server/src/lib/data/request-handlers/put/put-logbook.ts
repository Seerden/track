import { updateLogbook } from "@/lib/data/models/logbooks/update-logbook";
import { Logbook } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

export const putLogbook: RequestHandler = async (req, res) => {
	const { logbook } = req.body as { logbook: Logbook };
	const logbook_id = req.params.logbook_id;

	const updatedLogbook = await updateLogbook({ logbook });
	res.json(updatedLogbook);
};
