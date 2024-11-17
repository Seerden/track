import { insertTagWithRelation } from "@/lib/data/insert-tags";
import { RequestHandler } from "express";
import { TagInput } from "types/data/tag.types";

const postTag: RequestHandler = async (req, res) => {
	const { newTag, parent_id } = req.body as TagInput;
	const tag = await insertTagWithRelation({ newTag, parent_id });
	res.json({ tag });
};

export default postTag;
