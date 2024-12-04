import { createItemRow } from "@/lib/data/models/logbooks/create-item-row";
import type { NewItemRowInput } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/item/row`. */
export const postItemRow: RequestHandler = async (req, res) => {
	const { newItemRow, newFieldValues } = req.body as NewItemRowInput;

	const itemRow = await createItemRow({ newItemRow, newFieldValues });

	res.json(itemRow);
};
