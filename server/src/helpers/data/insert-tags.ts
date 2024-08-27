import { TagTagRelation } from "../../../types/data/relational.types";
import { NewTag, Tag } from "../../../types/data/tag.types";
import { ID } from "../../../types/data/utility.types";
import type { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** Inserts one or multiple tags into the database. Does not handle tag-tag relationships. */
export async function insertTags({
	sql = sqlConnection,
	newTags,
}: WithSQL<{ newTags: Array<NewTag> }>) {
	const insertedTags = sql<[Tag?]>`
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
	const [relation] = await sql<[TagTagRelation?]>`
        insert into tag_relations
        ${sql({ user_id, parent_id, child_id })}
        returning *
    `;
	return relation;
}
