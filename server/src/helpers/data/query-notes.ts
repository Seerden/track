import { Note } from "../../../types/data/note.types";
import { ID } from "../../../types/data/utility.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** Get all of a user's notes. */
export async function queryNotesByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<Note[]>`select * from notes where user_id = ${user_id}`;
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
