import { removeItemById } from "@/lib/data/models/logbooks/remove-item";
import type { RequestHandler } from "express";

export const deleteItem: RequestHandler = async (req, res) => {
	const item_id = +req.params.item_id; // TODO: parse the id properly using a regex -- or zod

	res.json(await removeItemById({ item_id }));
};
