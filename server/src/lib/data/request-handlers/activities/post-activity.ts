import {
	createRecurringActivity,
	insertActivityWithTags,
} from "@/lib/data/models/activities/insert-activity";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";
import type { ActivityInput } from "@shared/types/data/activity.types";
import type { NewRecurrenceInput } from "@shared/types/data/recurrence.types";

export const postActivity: RequestHandlerWithUserId = async ({ req, res }) => {
	const { activity, tagIds } = req.body as ActivityInput;
	const insertedActivity = await insertActivityWithTags({ activity, tag_ids: tagIds });
	res.json({ activity: insertedActivity });
};

export const postRecurringActivity: RequestHandlerWithUserId = async ({ req, res }) => {
	const { activity, tagIds, newRecurrence } = req.body as ActivityInput &
		NewRecurrenceInput;
	const insertedActivity = await createRecurringActivity({
		newActivity: activity,
		tag_ids: tagIds,
		newRecurrence,
	});
	res.json({ activity: insertedActivity });
};
