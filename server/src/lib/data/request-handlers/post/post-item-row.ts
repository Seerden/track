import { createItemRow } from "@/lib/data/models/logbooks/create-item-row";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { NewItemRowInput } from "@t/data/logbook.types";
import type { RequestHandler } from "express";

/** Request handler for `/data/logbook/item/row`. */
export const postItemRow: RequestHandler = async (req, res) => {
	const { newItemRow, newFieldValues } = req.body as NewItemRowInput;

	const user_id = getUserIdFromSessionOrBail(req, res);

	if (user_id) {
		const itemRow = await createItemRow({ newItemRow, newFieldValues, user_id });
		res.json(itemRow);
	}
};
