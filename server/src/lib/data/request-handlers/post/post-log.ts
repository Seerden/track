import { insertLog } from "@/lib/data/models/logbooks/insert-log";
import type { NewLogInput } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/log`. */
export const postLog: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	}

	const { newLog } = req.body as NewLogInput;

	const log = await insertLog({ newLog });

	res.json(log);
};
