import { createItemRow } from "@/lib/data/models/logbooks/create-item-row";
import type { NewFieldValue, NewItemRow } from "@t/data/logbook.new.types";
import type { RequestHandler } from "express";

export const postItemRow: RequestHandler = async (req, res) => {
	const { newItemRow, newFieldValues } = req.body as {
		newItemRow: NewItemRow;
		newFieldValues: NewFieldValue[];
	};

	const itemRow = await createItemRow({ newItemRow, newFieldValues });

	res.json(itemRow);
};
