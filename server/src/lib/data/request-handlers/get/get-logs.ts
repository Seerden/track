import {
	queryLogsByLogbook,
	queryLogsByUser,
} from "@/lib/data/models/logbooks/query-logs";
import type { RequestHandler } from "express";

/** Queries all logs by user. */
export const getLogs: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	} // TODO: same as everywhere else...

	res.json(await queryLogsByUser({ user_id }));
};

/** Queries all logs for a given logbook. */
export const getLogsByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;

	res.json(await queryLogsByLogbook({ logbook_id }));
};
