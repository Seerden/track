import { Note, NoteWithIds } from "../../../types/data/note.types";
import { NoteTagRelation } from "../../../types/data/relational.types";
import { ById } from "../../../types/data/utility.types";

export function mergeNotesAndRelations(
	notes: Note[],
	noteTagRelations: NoteTagRelation[]
) {
	const notesById = {} as ById<NoteWithIds>;
	for (const note of notes) {
		notesById[note.note_id] = { ...note, tag_ids: [] };
	}

	for (const { note_id, tag_id } of noteTagRelations) {
		notesById[note_id]?.tag_ids?.push(tag_id);
	}

	return notesById;
}
