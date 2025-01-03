import { insertTagWithRelations } from "@/lib/data/models/tags/insert-tags";
import type { TagInput } from "@shared/types/data/tag.types";
import type { RequestHandler } from "express";

export const postTag: RequestHandler = async (req, res) => {
	const { newTag, parent_id } = req.body as TagInput;
	const tag = await insertTagWithRelations({ newTag, parent_id });
	res.json({ tag });
};
