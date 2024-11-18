import type { Activity, NewActivity } from "@t/data/activity.types";
import type { ActivityTagRelation } from "@t/data/relational.types";
import type { ID } from "@t/data/utility.types";
import type { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

async function insertActivity({
	sql = sqlConnection,
	activity,
}: WithSQL<{ activity: NewActivity }>) {
	const [insertedActivity] = await sql<[Activity]>`
      insert into activities ${sql(activity)}
      returning *
   `;

	return insertedActivity;
}

async function linkTagsToActivity({
	sql = sqlConnection,
	user_id,
	activity_id,
	tag_ids,
}: WithSQL<{ activity_id: ID; user_id: ID; tag_ids: ID[] }>) {
	const tagRelations = tag_ids.map((tag_id) => ({ user_id, activity_id, tag_id }));

	return sql<ActivityTagRelation[]>`
      insert into activities_tags ${sql(tagRelations)}
      returning *
   `;
}

export async function insertActivityWithTags({
	sql = sqlConnection,
	activity,
	tag_ids,
}: WithSQL<{ activity: NewActivity; tag_ids?: ID[] }>) {
	return await sql.begin(async (q) => {
		const insertedActivity = await insertActivity({ sql: q, activity });
		let linkedTagIds: ID[] = [];

		if (Array.isArray(tag_ids) && tag_ids?.length) {
			const relations = await linkTagsToActivity({
				sql: q,
				user_id: insertedActivity.user_id,
				activity_id: insertedActivity.activity_id,
				tag_ids,
			});
			linkedTagIds = relations.map((r) => r.tag_id);
		}

		return Object.assign(insertedActivity, { tag_ids: linkedTagIds });
	});
}
