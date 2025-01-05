import { insertActivityWithTags } from "@/lib/data/models/activities/insert-activity";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";
import type { ActivityInput } from "@shared/types/data/activity.types";

export const postActivity: RequestHandlerWithUserId = async ({ req, res }) => {
	const { activity, tagIds } = req.body as ActivityInput;
	const insertedActivity = await insertActivityWithTags({ activity, tag_ids: tagIds });
	res.json({ activity: insertedActivity });
};
