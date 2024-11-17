import { queryNotesAndRelations } from "@/lib/data/query-notes";
import { RequestHandler } from "express";

const getNotes: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id; // always exists if we're here, because of middleware
	const notesById = await queryNotesAndRelations({ user_id });
	res.json({ byId: notesById });
};

export default getNotes;
