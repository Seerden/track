import { queryActivityByIdWithRelations } from "@/lib/data/models/activities/query-activities";
import { updateActivity } from "@/lib/data/models/activities/update-activity";
import type { ActivityUpdateInput } from "@shared/types/data/activity.types";
import type { RequestHandler } from "express";

export const putActivity: RequestHandler = async (req, res) => {
	const input = req.body as ActivityUpdateInput;
	const activity = await updateActivity({ input });
	const updatedActivity = await queryActivityByIdWithRelations({
		activity_id: activity.activity_id,
	});
	res.json(updatedActivity);
};
