import { removeLogById } from "@/lib/data/models/logbooks/remove-log";
import type { RequestHandler } from "express";

export const deleteLog: RequestHandler = async (req, res) => {
	const log_id = +req.params.log_id;

	// TODO: parse the id properly using a regex -- or zod

	res.json(await removeLogById({ log_id }));
};
