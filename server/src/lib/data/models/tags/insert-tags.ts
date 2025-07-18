import { sqlConnection } from "@/db/init";
import type { NewTag, TagInput, TagWithId, TagWithIds } from "@shared/lib/schemas/tag";
import type { TagTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Inserts one or multiple tags into the database. Does not handle tag-tag relationships. */
export const insertTags: QueryFunction<
	{ newTags: NewTag[] },
	Promise<TagWithId[]>
> = async ({ sql = sqlConnection, newTags }) => {
	const insertedTags = sql<[TagWithId]>`
        insert into tags 
        ${sql(newTags)}
        returning *
    `;
	return insertedTags;
};

/** Creates a single parent-child relationship between two tags. */
export const linkTagToParent: QueryFunction<
	{ user_id: ID; parent_id: ID; child_id: ID },
	Promise<TagTagRelation>
> = async ({ sql = sqlConnection, user_id, parent_id, child_id }) => {
	const [relation] = await sql<[TagTagRelation]>`
        insert into tags_tags
        ${sql({ user_id, parent_id, child_id })}
        returning *
    `;
	return relation;
};

export const insertTagWithRelations: QueryFunction<
	TagInput,
	Promise<TagWithIds>
> = async ({ sql = sqlConnection, newTag, parent_id }) => {
	return await sql.begin(async (q) => {
		const [tag] = await insertTags({ sql: q, newTags: [newTag] });

		if (!parent_id) {
			return Object.assign(tag, { child_ids: [], parent_id: null });
		}

		// TODO: check if parent_id exists and belongs to the user

		const relation = await linkTagToParent({
			sql: q,
			user_id: tag.user_id,
			parent_id,
			child_id: tag.tag_id,
		});

		return Object.assign(tag, { child_ids: [], parent_id: relation.parent_id });
	});
};
