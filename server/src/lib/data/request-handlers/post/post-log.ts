import { insertLog } from "@/lib/data/models/logbooks/insert-log";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { NewLogInput } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/log`. */
export const postLog: RequestHandler = async (req, res) => {
	const { newLog, logTemplateId } = req.body as NewLogInput;

	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const log = await insertLog({ newLog, logTemplateId, user_id });

		res.json(log);
	}
};
