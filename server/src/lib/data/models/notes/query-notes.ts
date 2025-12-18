import type { Note } from "@shared/lib/schemas/note";
import type { NoteTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";
import { mergeNotesAndRelations } from "./utility/merge-notes-and-relations";

/** Get all of a user's notes. */
export const queryNotesByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return sql<Note[]>`
      select * from notes where user_id = ${user_id}
   `;
	}
);

/** Gets all of a user's note_tags relations. */
const queryNoteTagsByUser = query(async (sql, { user_id }: { user_id: ID }) => {
	return sql<NoteTagRelation[]>`
      select * from notes_tags where user_id = ${user_id}
   `;
});

/** Gets all of a user's notes including their tag(_id)s */
export const queryNotesAndRelations = query(
	async (sql, { user_id }: { user_id: ID }) => {
		const notes = await queryNotesByUser({ user_id });
		const noteTagRelations = await queryNoteTagsByUser({ user_id });

		return mergeNotesAndRelations(notes, noteTagRelations);
	}
);

/** An activity can be linked to multiple notes (TODO: should a description also
 * be implemented as a note?). This retrieves any and all notes linked to an
 * activity. */
export const queryNotesByActivity = query(
	async (sql, { activity_id, user_id }: { activity_id: ID; user_id: ID }) => {
		return sql<Note[]>`
      select * from notes where 
      activity_id = ${activity_id}
      and user_id = ${user_id}
   `;
	}
);
