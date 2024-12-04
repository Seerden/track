import { createItemTemplate } from "@/lib/data/models/logbooks/create-item-template";
import type { NewItemTemplateInput } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/item/template`. */
export const postItemTemplate: RequestHandler = async (req, res) => {
	const { newItemTemplate, newFieldTemplates } = req.body as NewItemTemplateInput;

	const template = await createItemTemplate({
		newItemTemplate,
		newFieldTemplates,
	});

	res.json(template);
};
