import { insertLog } from "@/lib/data/models/logbooks/insert-log";
import type { NewLog } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

export const postLog: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	}

	const { newLog } = req.body as { newLog: NewLog };

	const log = await insertLog({ newLog });

	res.json(log);
};
