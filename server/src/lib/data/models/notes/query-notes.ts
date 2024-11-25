import { sqlConnection } from "@/db/init";
import type { Note, NoteWithIds } from "@t/data/note.types";
import type { NoteTagRelation } from "@t/data/relational.types";
import type { ById, ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { mergeNotesAndRelations } from "./merge-notes-and-relations";

/** Get all of a user's notes. */
export const queryNotesByUser: QueryFunction<{ user_id: ID }, Promise<Note[]>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	return sql<Note[]>`
      select * from notes where user_id = ${user_id}
   `;
};

/** Gets all of a user's note_tags relations. */
const queryNoteTagsByUser: QueryFunction<
	{
		user_id: ID;
	},
	Promise<NoteTagRelation[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<NoteTagRelation[]>`
      select * from notes_tags where user_id = ${user_id}
   `;
};

/** Gets all of a user's notes including their tag(_id)s */
export const queryNotesAndRelations: QueryFunction<
	{ user_id: ID },
	Promise<ById<NoteWithIds>>
> = async ({ sql = sqlConnection, user_id }) => {
	const notes = await queryNotesByUser({ sql, user_id });
	const noteTagRelations = await queryNoteTagsByUser({ sql, user_id });

	return mergeNotesAndRelations(notes, noteTagRelations);
};

/** An activity can be linked to multiple notes (TODO: should a description also
 * be implemented as a note?). This retrieves any and all notes linked to an
 * activity. */
export const queryNotesByActivity: QueryFunction<
	{ activity_id: ID; user_id: ID },
	Promise<Note[]>
> = async ({ sql = sqlConnection, activity_id, user_id }) => {
	return sql<Note[]>`
      select * from notes where 
      activity_id = ${activity_id}
      and user_id = ${user_id}
   `;
};
