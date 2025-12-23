import type { NewTag, TagInput, TagWithId } from "@shared/lib/schemas/tag";
import type { TagTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { createTransaction, query } from "@/lib/query-function";

/** Inserts one or multiple tags into the database. Does not handle tag-tag relationships. */
const insertTags = query(async (sql, { newTags }: { newTags: NewTag[] }) => {
	const insertedTags = await sql<[TagWithId]>`
        insert into tags 
        ${sql(newTags)}
        returning *
      `;
	return insertedTags;
});

/** Creates a single parent-child relationship between two tags. */
export const linkTagToParent = query(
	async (sql, input: { user_id: ID; parent_id: ID; child_id: ID }) => {
		const [relation] = await sql<[TagTagRelation]>`
        insert into tags_tags
        ${sql(input)}
        returning *
    `;
		return relation;
	}
);

export const insertTagWithRelations = query(
	async ({ newTag, parent_id, user_id }: TagInput & { user_id: ID }) => {
		return await createTransaction(async () => {
			const insert = { ...newTag, user_id };

			const [tag] = await insertTags({ newTags: [insert] });

			if (!parent_id) {
				return Object.assign(tag, { child_ids: [], parent_id: null });
			}

			// TODO: check if parent_id exists and belongs to the user

			const relation = await linkTagToParent({
				user_id: tag.user_id,
				parent_id,
				child_id: tag.tag_id,
			});

			return Object.assign(tag, {
				child_ids: [],
				parent_id: relation.parent_id,
			});
		});
	}
);
