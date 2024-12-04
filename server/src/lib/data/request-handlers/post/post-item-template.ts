import { createItemTemplate } from "@/lib/data/models/logbooks/create-item-template";
import type { NewItemTemplateInput } from "@t/data/logbook.new.types";
import type { RequestHandler } from "express";

export const postItemTemplate: RequestHandler = async (req, res) => {
	const { newItemTemplate, newFieldTemplates } = req.body as NewItemTemplateInput;

	const template = await createItemTemplate({
		newItemTemplate,
		newFieldTemplates,
	});

	res.json(template);
};
