import {
	createTagTreeMap,
	getTagsWithRelations,
} from "@/lib/data/merge-tags-and-relations";
import { RequestHandler } from "express";

const getTagsTree: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id; // always exists if we're here, because of middleware
	const tagsById = await getTagsWithRelations({ user_id });
	const tree = createTagTreeMap(tagsById);
	res.json({ byId: tree });
};

export default getTagsTree;
