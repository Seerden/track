import { groupById } from "@/lib/data/models/group-by-id";
import {
	queryLogsByLogbook,
	queryLogsByUser,
} from "@/lib/data/models/logbooks/query-logs";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express";

export const getLogs: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const logs = await queryLogsByUser({ user_id });
		const byId = groupById(logs, "log_id");

		res.json({ byId });
	}
};

export const getLogsByLogbook: RequestHandler = async (req, res) => {
	const logbook_id = +req.params.logbook_id;
	const logs = await queryLogsByLogbook({ logbook_id });
	const byId = groupById(logs, "log_id");

	res.json({ byId });
};
