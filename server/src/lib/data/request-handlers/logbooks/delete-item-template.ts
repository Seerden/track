import { removeItemTemplateById } from "@/lib/data/models/logbooks/remove-item-template";
import type { RequestHandler } from "express";

export const deleteItemTemplate: RequestHandler = async (req, res) => {
	const item_template_id = +req.params.item_template_id;

	// TODO: parse the id properly using a regex -- or zod

	res.json(await removeItemTemplateById({ item_template_id }));
};
