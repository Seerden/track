import { insertItem } from "@/lib/data/models/logbooks/insert-item";
import type { NewItem } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/item`. */
export const postItem: RequestHandler = async (req, res) => {
	const { newItem } = req.body as { newItem: NewItem };

	const item = await insertItem({ newItem });

	res.json(item);
};
