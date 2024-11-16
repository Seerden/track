import { getTagsWithRelations } from "@/lib/data/merge-tags-and-relations";
import { RequestHandler } from "express";

const getTags: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id; // always exists if we're here, because of middleware
	const tagsById = await getTagsWithRelations({ user_id });
	res.json({ byId: tagsById });
};

export default getTags;
