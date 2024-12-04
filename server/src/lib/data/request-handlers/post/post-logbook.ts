import { insertLogbook } from "@/lib/data/models/logbooks/insert-logbook";
import type { NewLogbook } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

// TODO: I'm exporting this as const, but elsewhere I'm exporting it as default. I should be consistent.
export const postLogbook: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	}

	const { newLogbook } = req.body as { newLogbook: NewLogbook };

	const logbook = await insertLogbook({ newLogbook });

	res.json(logbook);
};
