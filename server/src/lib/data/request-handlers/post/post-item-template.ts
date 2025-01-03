import { createItemTemplate } from "@/lib/data/models/logbooks/create-item-template";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { NewItemTemplateInput } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

export const postItemTemplate: RequestHandler = async (req, res) => {
	const { newItemTemplate, newFieldTemplates } = req.body as NewItemTemplateInput;

	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const template = await createItemTemplate({
			newItemTemplate,
			newFieldTemplates,
			user_id,
		});

		res.json(template);
	}
};
