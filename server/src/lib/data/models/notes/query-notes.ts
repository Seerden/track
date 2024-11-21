import { sqlConnection } from "@/db/init";
import type { Note } from "@t/data/note.types";
import type { NoteTagRelation } from "@t/data/relational.types";
import type { ID } from "@t/data/utility.types";
import type { WithSQL } from "types/sql.types";
import { mergeNotesAndRelations } from "./merge-notes-and-relations";

/** Get all of a user's notes. */
export async function queryNotesByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<Note[]>`select * from notes where user_id = ${user_id}`;
}

/** Gets all of a user's note_tags relations. */
async function queryNoteTagsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<NoteTagRelation[]>`
      select * from notes_tags where user_id = ${user_id}
   `;
}

/** Gets all of a user's notes including their tag(_id)s */
export async function queryNotesAndRelations(
	{ user_id }: { user_id: ID },
	sql = sqlConnection,
) {
	const notes = await queryNotesByUser({ sql, user_id });
	const noteTagRelations = await queryNoteTagsByUser({ sql, user_id });

	return mergeNotesAndRelations(notes, noteTagRelations);
}

/** An activity can be linked to multiple notes (TODO: should a description also
 * be implemented as a note?). This retrieves any and all notes linked to an
 * activity. */
export async function queryNotesByActivity({
	sql = sqlConnection,
	activity_id,
	user_id,
}: WithSQL<{ activity_id: ID; user_id: ID }>) {
	return sql<Note[]>`select * from notes where 
      activity_id = ${activity_id}
      and user_id = ${user_id}`;
}
