import {
	queryLogbookById,
	queryLogbooksByUser,
} from "@/lib/data/models/logbooks/query-logbooks";
import type { RequestHandler } from "express";

/** Queries all logbooks by user. */
export const getLogbooks: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	} // TODO: should never happen because of middleware

	res.json(await queryLogbooksByUser({ user_id }));
};

/** Queries a single logbook by id. */
export const getLogbook: RequestHandler = async (req, res) => {
	res.json(queryLogbookById({ logbook_id: +req.params.logbook_id }));
};
