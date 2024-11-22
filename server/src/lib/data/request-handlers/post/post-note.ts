import { insertNoteWithTags } from "@/lib/data/models/notes/insert-note";
import type { NoteInput } from "@t/data/note.types";
import type { RequestHandler } from "express";

const postNote: RequestHandler = async (req, res) => {
	const { note, tagIds } = req.body as NoteInput;
	const insertedNote = await insertNoteWithTags({ note, tag_ids: tagIds });
	res.json({ note: insertedNote });
};

export default postNote;
