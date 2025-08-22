import type { RequestHandler } from "express";
import { queryNotesAndRelations } from "@/lib/data/models/notes/query-notes";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";

export const getNotes: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const notesById = await queryNotesAndRelations({ user_id });
		res.json({ byId: notesById });
	}
};
