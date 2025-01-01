import {
	createTagTreeMap,
	getTagsWithRelations,
} from "@/lib/data/models/tags/merge-tags-and-relations";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express";

const getTagsTree: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const tagsById = await getTagsWithRelations({ user_id });
		const tree = createTagTreeMap(tagsById);
		res.json({ byId: tree });
	}
};

export default getTagsTree;
