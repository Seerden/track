import { queryFieldTemplatesByItemTemplate } from "@/lib/data/models/logbooks/query-field-templates";
import type { RequestHandler } from "express";

export const getFieldTemplatesByItemTemplate: RequestHandler = async (req, res) => {
	const item_template_id = req.params.item_template_id;
	const fieldTemplates = await queryFieldTemplatesByItemTemplate({ item_template_id });

	res.json({ fieldTemplates });
};
