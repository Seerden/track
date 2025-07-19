import { sqlConnection } from "@/db/init";
import { createRecurrence } from "@/lib/data/models/activities/insert-recurrence";
import { linkTagsToActivity } from "@/lib/data/models/activities/link-and-unlink-tags-and-activities";
import type {
	Activity,
	ActivityWithIds,
	NewActivity,
	NewRecurrenceInput,
	RecurrenceWithIds,
} from "@shared/lib/schemas/activity";
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
	console.log({ sql, a: 1 });
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

/** Simultaneously creates an activity, a recurrence relation, and assigns the
 * recurrence relation to the activity. */
export const createRecurringActivity: QueryFunction<
	{
		// TODO: clean up the input types for all the functions here.
		// ActivityInput should be used, but it has tagIds instead of tag_ids..
		// Generalize this like we've done with newer functionality.
		newActivity: NewActivity;
		tag_ids?: ID[];
	} & NewRecurrenceInput,
	Promise<{ activity: ActivityWithIds; recurrence: RecurrenceWithIds }>
> = async ({ sql = sqlConnection, newActivity, tag_ids, ...newRecurrence }) => {
	// TODO: I'm currently not using a a transaction here, because nesting
	// transactions doesn't work.
	const activity = await insertActivityWithTags({
		sql,
		activity: newActivity,
		tag_ids: tag_ids,
	});

	const recurrence = await createRecurrence({
		sql,
		activity_id: activity.activity_id,
		user_id: activity.user_id,
		...newRecurrence,
	});

	return { activity, recurrence };
};
