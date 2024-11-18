import type { Note, NoteWithIds } from "@t/data/note.types";
import type { NoteTagRelation } from "@t/data/relational.types";
import type { ById } from "@t/data/utility.types";

/** Takes a list of notes, and a list of node<->tag relations and outputs a
 * single notesById object. */
export function mergeNotesAndRelations(
	notes: Note[],
	noteTagRelations: NoteTagRelation[],
) {
	const notesById = {} as ById<NoteWithIds>;
	for (const note of notes) {
		notesById[note.note_id] = Object.assign(note, { tag_ids: [] });
	}

	for (const { note_id, tag_id } of noteTagRelations) {
		notesById[note_id]?.tag_ids?.push(tag_id);
	}

	return notesById;
}
