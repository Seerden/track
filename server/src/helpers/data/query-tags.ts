import {
	ActivityTagRelation,
	TagTagRelation,
} from "../../../types/data/relational.types";
import { TagWithId } from "../../../types/data/tag.types";
import { ID } from "../../../types/data/utility.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** Get all of a user's tags. */
export async function queryTagsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID; withChildren?: boolean }>) {
	return sql<TagWithId[]>`select * from tags where user_id = ${user_id}`;
}

/** Get all child tags for a given parent tag. */
export async function queryTagsByParent({
	sql = sqlConnection,
	parent_id,
}: WithSQL<{ parent_id: ID }>) {
	const relations = await sql<
		TagTagRelation[]
	>`select * from tag_relations where parent_id = ${parent_id}`;

	if (!relations?.length) return [];

	const childIds = relations.map((r) => r.child_id);
	return sql<TagWithId[]>`select * from tags where tag_id = any(${childIds})`;
}

/** Get all the tags for a given activity. */
export async function queryTagsByActivity({
	sql = sqlConnection,
	activity_id,
}: WithSQL<{ activity_id: ID }>) {
	const activityTags = await sql<
		ActivityTagRelation[]
	>`select * from activities_tags where activity_id = ${activity_id}`;

	if (!activityTags?.length) return [];

	const tagIds = activityTags.map((at) => at.tag_id);

	return sql<TagWithId[]>`select * from tags where tag_id = any(${tagIds})`;
}

export async function queryTagRelations({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql`select * from tag_relations where user_id = ${user_id}`;
}

export async function getTagsWithRelations({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	const tags = await queryTagsByUser({ sql, user_id });

	if (!tags?.length) return [];

	const tagIds = tags.map((t) => t.tag_id);

	const relations = await sql<
		TagTagRelation[]
	>`select * from tag_relations where parent_id = any(${tagIds}) or child_id = any(${tagIds})`;

	return { tags, relations };
}
