import { TagTagRelation } from "../../../types/data/relational.types";
import { NewTag, TagInput, TagWithId, TagWithIds } from "../../../types/data/tag.types";
import { ID } from "../../../types/data/utility.types";
import type { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** Inserts one or multiple tags into the database. Does not handle tag-tag relationships. */
export async function insertTags({
	sql = sqlConnection,
	newTags,
}: WithSQL<{ newTags: Array<NewTag> }>) {
	const insertedTags = sql<[TagWithId]>`
        insert into tags 
        ${sql(newTags)}
        returning *
    `;
	return insertedTags;
}

/** Creates a single parent-child relationship between two tags. */
export async function insertTagRelation({
	sql = sqlConnection,
	user_id,
	parent_id,
	child_id,
}: WithSQL<{ user_id: ID; parent_id: ID; child_id: ID }>) {
	const [relation] = await sql<[TagTagRelation]>`
        insert into tags_tags
        ${sql({ user_id, parent_id, child_id })}
        returning *
    `;
	return relation;
}

export async function insertTagWithRelation({
	sql = sqlConnection,
	newTag,
	parent_id,
}: WithSQL<TagInput>): Promise<TagWithIds> {
	return await sql.begin(async (q) => {
		const [tag] = await insertTags({ sql: q, newTags: [newTag] });

		if (!parent_id) {
			return Object.assign(tag, { child_ids: [], parent_id: null });
		}

		// TODO: check if parent_id exists and belongs to the user

		const relation = await insertTagRelation({
			sql: q,
			user_id: tag.user_id,
			parent_id,
			child_id: tag.tag_id,
		});

		return Object.assign(tag, { child_ids: [], parent_id: relation.parent_id });
	});
}
