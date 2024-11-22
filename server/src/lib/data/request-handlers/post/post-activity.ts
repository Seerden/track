import { insertActivityWithTags } from "@/lib/data/models/activities/insert-activity";
import type { ActivityInput } from "@t/data/activity.types";
import type { RequestHandler } from "express";

const postActivity: RequestHandler = async (req, res) => {
	const { activity, tagIds } = req.body as ActivityInput;
	const insertedActivity = await insertActivityWithTags({ activity, tag_ids: tagIds });
	res.json({ activity: insertedActivity });
};

export default postActivity;
