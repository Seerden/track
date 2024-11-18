import type { NewNote, Note, NoteWithIds } from "@t/data/note.types";
import type { NoteTagRelation } from "@t/data/relational.types";
import type { ID } from "@t/data/utility.types";
import type { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

async function insertNote({ sql = sqlConnection, note }: WithSQL<{ note: NewNote }>) {
	const [insertedNote] = await sql<[Note]>`
      insert into notes 
      ${sql(note)}
      returning *
   `;

	return insertedNote;
}

// TODO: I like the name of this more than how I named createTagRelation for
// tag<->tag relations
async function linkTagsToNote({
	sql = sqlConnection,
	user_id,
	note_id,
	tag_ids,
}: WithSQL<{ user_id: ID; note_id: ID; tag_ids: ID[] }>) {
	const tagRelations = tag_ids.map((tag_id) => ({ user_id, note_id, tag_id }));

	return sql<[NoteTagRelation]>`
      insert into notes_tags 
      ${sql(tagRelations)}
      returning *
   `;
}

export async function insertNoteWithTags({
	sql = sqlConnection,
	note,
	tag_ids,
}: WithSQL<{ note: NewNote; tag_ids?: ID[] }>): Promise<NoteWithIds> {
	return await sql.begin(async (q) => {
		const insertedNote = await insertNote({ sql: q, note });
		let linkedTagIds: ID[] = [];

		if (Array.isArray(tag_ids) && tag_ids?.length) {
			const relations = await linkTagsToNote({
				sql: q,
				user_id: insertedNote.user_id,
				note_id: insertedNote.note_id,
				tag_ids,
			});
			linkedTagIds = relations.map((r) => r.tag_id);
		}

		return Object.assign(insertedNote, { tag_ids: linkedTagIds });
	});
}
