import { queryActivityByIdWithRelations } from "@/lib/data/models/activities/query-activities";
import { updateActivityCompletion } from "@/lib/data/models/activities/update-activity";
import type { TaskUpdateInput } from "@shared/types/data/activity.types";
import type { RequestHandler } from "express";

const putTaskCompletion: RequestHandler = async (req, res) => {
	const input = req.body as TaskUpdateInput;
	const [activity] = await updateActivityCompletion({ input });
	const updatedActivity = await queryActivityByIdWithRelations({
		activity_id: activity.activity_id,
	});
	res.json(updatedActivity);
};

export default putTaskCompletion;
