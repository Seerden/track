import { groupById } from "@/lib/data/models/group-by-id";
import {
	queryLogbookById,
	queryLogbooksByUser,
} from "@/lib/data/models/logbooks/query-logbooks";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express";

export const getLogbooks: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const logbooks = await queryLogbooksByUser({ user_id });
		const byId = groupById(logbooks, "logbook_id");

		res.json({ byId });
	}
};

export const getLogbook: RequestHandler = async (req, res) => {
	res.json(await queryLogbookById({ logbook_id: +req.params.logbook_id }));
};
