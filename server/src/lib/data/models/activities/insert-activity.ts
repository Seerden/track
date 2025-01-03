import { sqlConnection } from "@/db/init";
import { linkTagsToActivity } from "@/lib/data/models/activities/link-and-unlink-tags-and-activities";
import type {
	Activity,
	ActivityWithIds,
	NewActivity,
} from "@shared/types/data/activity.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

const insertActivity: QueryFunction<
	{ activity: NewActivity },
	Promise<Activity>
> = async ({ sql = sqlConnection, activity }) => {
	const [insertedActivity] = await sql<[Activity]>`
      insert into activities ${sql(activity)}
      returning *
   `;

	return insertedActivity;
};

export const insertActivityWithTags: QueryFunction<
	{
		activity: NewActivity;
		tag_ids?: ID[];
	},
	Promise<ActivityWithIds>
> = async ({ sql = sqlConnection, activity, tag_ids }) => {
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
};
