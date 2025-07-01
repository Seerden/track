import { insertNoteWithTags } from "@/lib/data/models/notes/insert-note";
import type { NoteInput } from "@shared/lib/schemas/note";
import type { RequestHandler } from "express";

export const postNote: RequestHandler = async (req, res) => {
	const { note, tagIds } = req.body as NoteInput;
	const insertedNote = await insertNoteWithTags({ note, tag_ids: tagIds });
	res.json({ note: insertedNote });
};
