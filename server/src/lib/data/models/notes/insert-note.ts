import { sqlConnection } from "@/db/init";
import type { NewNote, Note, NoteWithIds } from "@shared/types/data/note.types";
import type { NoteTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

const insertNote: QueryFunction<{ note: NewNote }, Promise<Note>> = async ({
	sql = sqlConnection,
	note,
}) => {
	const [insertedNote] = await sql<[Note]>`
      insert into notes 
      ${sql(note)}
      returning *
   `;

	return insertedNote;
};

// TODO: I like the name of this more than how I named createTagRelation for
// tag<->tag relations
const linkTagsToNote: QueryFunction<
	{
		user_id: ID;
		note_id: ID;
		tag_ids: ID[];
	},
	Promise<NoteTagRelation[]>
> = async ({ sql = sqlConnection, user_id, note_id, tag_ids }) => {
	const tagRelations = tag_ids.map((tag_id) => ({ user_id, note_id, tag_id }));

	return sql<[NoteTagRelation]>`
      insert into notes_tags 
      ${sql(tagRelations)}
      returning *
   `;
};

export const insertNoteWithTags: QueryFunction<
	{
		note: NewNote;
		tag_ids?: ID[];
	},
	Promise<NoteWithIds>
> = async ({ sql = sqlConnection, note, tag_ids }) => {
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
};
