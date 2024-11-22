import { sqlConnection } from "@/db/init";
import { linkTagsToActivity } from "@/lib/data/models/activities/link-and-unlink-tags-and-activities";
import type { Activity, NewActivity } from "@t/data/activity.types";
import type { ID } from "@t/data/utility.types";
import type { WithSQL } from "types/sql.types";

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
