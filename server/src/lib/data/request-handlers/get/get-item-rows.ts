import { groupById } from "@/lib/data/models/group-by-id";
import { queryItemRows } from "@/lib/data/models/logbooks/query-item-rows";
import type { RequestHandler } from "express-serve-static-core";

export const getItemRows: RequestHandler = async (req, res) => {
	const user_id = req.session.user?.user_id;
	if (!user_id) {
		return res.status(401).send("Unauthorized");
	}

	const itemRows = await queryItemRows({ user_id });
	const byId = groupById(itemRows, "item_row_id");

	res.json({ byId });
};
