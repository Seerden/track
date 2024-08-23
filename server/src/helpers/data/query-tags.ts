import { ActivityTagRelation } from "../../../types/data/relational.types";
import { Tag } from "../../../types/data/tag.types";
import { ID } from "../../../types/data/utility.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** Get all of a user's tags. */
export async function getTagsByUser({
	sql = sqlConnection,
	username,
}: WithSQL<{ username: string; withChildren?: boolean }>) {
	return sql`select * from tags where username = ${username}`;
}

/** Get all child tags for a given parent tag. */
export async function queryTagsByParent({
	sql = sqlConnection,
	parent_id,
}: WithSQL<{ parent_id: ID }>) {
	const relations =
		await sql`select * from tag_relations where parent_id = ${parent_id}`;

	if (!relations?.length) return [];

	const childIds = relations.map((r) => r.child_id);
	return sql`select * from tags where tag_id = any(${childIds})`;
}

/** Get all the tags for a given activity. */
export async function queryTagsByActivity({
	sql = sqlConnection,
	activity_id,
}: WithSQL<{ activity_id: ID }>) {
	const activityTags = await sql<
		[ActivityTagRelation]
	>`select * from activities_tags where activity_id = ${activity_id}`;

	if (!activityTags?.length) return [];

	const tagIds = activityTags.map((at) => at.tag_id);

	return sql<[Tag]>`select * from tags where tag_id = any(${tagIds})`;
}
