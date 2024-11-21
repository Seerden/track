import { queryActivityByIdWithRelations } from "@/lib/data/models/activities/query-activities";
import { updateActivity } from "@/lib/data/models/activities/update-activity";
import type { ActivityUpdateInput } from "@t/data/activity.types";
import type { RequestHandler } from "express";

const putActivity: RequestHandler = async (req, res) => {
	const { input } = req.body as { input: ActivityUpdateInput };
	const activity = await updateActivity({ input });
	const updatedActivity = await queryActivityByIdWithRelations({
		activity_id: activity.activity_id,
	});
	res.json(updatedActivity);
};

export default putActivity;
