import type {
	Activity,
	NewActivity,
	NewRecurrenceInput,
} from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { createRecurrence } from "@/lib/data/models/activities/insert-recurrence";
import { linkTagsToActivity } from "@/lib/data/models/activities/link-and-unlink-tags-and-activities";
import { createTransaction, query } from "@/lib/query-function";

export const insertActivity = query(async (sql, activity: NewActivity) => {
	const [insertedActivity] = await sql<[Activity]>`
      insert into activities ${sql(activity)}
      returning *
   `;

	return insertedActivity;
});

export const insertActivityWithTags = query(
	async ({ activity, tag_ids }: { activity: NewActivity; tag_ids?: ID[] }) => {
		return await createTransaction(async () => {
			const insertedActivity = await insertActivity(activity);
			let linkedTagIds: ID[] = [];

			if (Array.isArray(tag_ids) && tag_ids?.length) {
				const relations = await linkTagsToActivity({
					user_id: insertedActivity.user_id,
					activity_id: insertedActivity.activity_id,
					tag_ids,
				});
				linkedTagIds = relations.map((r) => r.tag_id);
			}

			return Object.assign(insertedActivity, { tag_ids: linkedTagIds });
		});
	}
);

/** Simultaneously creates an activity, a recurrence relation, and assigns the
 * recurrence relation to the activity. */
export const createRecurringActivity = query(
	async ({
		newActivity,
		tag_ids,
		...recurrence
	}: {
		// TODO: clean up the input types for all the functions here.
		// ActivityInput should be used, but it has tagIds instead of tag_ids..
		// Generalize this like we've done with newer functionality.
		newActivity: NewActivity;
		tag_ids?: ID[];
	} & NewRecurrenceInput) => {
		return await createTransaction(async () => {
			// TODO: I'm currently not using a a transaction here, because nesting
			// transactions doesn't work.
			const activity = await insertActivityWithTags({
				activity: newActivity,
				tag_ids: tag_ids,
			});

			const createdRecurrence = await createRecurrence({
				activity_id: activity.activity_id,
				user_id: activity.user_id,
				...recurrence,
			});

			return { activity, recurrence: createdRecurrence };
		});
	}
);
