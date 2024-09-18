import type { NewNote, Note } from "../../../types/data/note.types";
import type { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

export async function createNote({
	sql = sqlConnection,
	note,
}: WithSQL<{ note: NewNote }>) {
	const [insertedNote] = await sql<[Note]>`
      insert into notes 
      ${sql(note)}
      returning *
   `;

	return insertedNote;
}
