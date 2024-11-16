import { insertActivityWithTags } from "@/lib/data/insert-activity";
import { RequestHandler } from "express";
import { ActivityInput } from "types/data/activity.types";

const postActivity: RequestHandler = async (req, res) => {
	const { activity, tagIds } = req.body as ActivityInput;
	const insertedActivity = await insertActivityWithTags({ activity, tag_ids: tagIds });
	res.json({ activity: insertedActivity });
};

export default postActivity;
