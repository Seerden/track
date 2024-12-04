import { queryFields } from "@/lib/data/models/logbooks/query-fields";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbooks/fields`. */
export const getFields: RequestHandler = async (req, res) => {
	const user_id = +(req.session.user?.user_id ?? 0);
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	}

	const byId = await queryFields({ user_id });
	res.json({ byId });
};
