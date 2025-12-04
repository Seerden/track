import type { NewNote, Note } from "@shared/lib/schemas/note";
import type { NoteTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { createTransaction, query } from "@/lib/query-function";

const insertNote = query(async (sql, { note }: { note: NewNote }) => {
	const [insertedNote] = await sql<[Note]>`
      insert into notes 
      ${sql(note)}
      returning *
   `;

	return insertedNote;
});

// TODO: I like the name of this more than how I named createTagRelation for
// tag<->tag relations
const linkTagsToNote = query(
	async (
		sql,
		{ user_id, note_id, tag_ids }: { user_id: ID; note_id: ID; tag_ids: ID[] }
	) => {
		const tagRelations = tag_ids.map((tag_id) => ({
			user_id,
			note_id,
			tag_id,
		}));

		return sql<[NoteTagRelation]>`
      insert into notes_tags 
      ${sql(tagRelations)}
      returning *
   `;
	}
);

export const insertNoteWithTags = query(
	async ({ note, tag_ids }: { note: NewNote; tag_ids?: ID[] }) => {
		return await createTransaction(async () => {
			const insertedNote = await insertNote({ note });
			let linkedTagIds: ID[] = [];

			if (Array.isArray(tag_ids) && tag_ids?.length) {
				const relations = await linkTagsToNote({
					user_id: insertedNote.user_id,
					note_id: insertedNote.note_id,
					tag_ids,
				});
				linkedTagIds = relations.map((r) => r.tag_id);
			}

			return Object.assign(insertedNote, { tag_ids: linkedTagIds });
		});
	}
);
