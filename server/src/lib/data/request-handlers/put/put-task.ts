import { queryActivityByIdWithRelations } from "@/lib/data/query-activities";
import { updateActivityCompletion } from "@/lib/data/update-activity";
import type { ActivityUpdateInput } from "@t/data/activity.types";
import type { RequestHandler } from "express";

const putTaskCompletion: RequestHandler = async (req, res) => {
	const { input } = req.body as { input: ActivityUpdateInput };
	const [activity] = await updateActivityCompletion({ input });
	const updatedActivity = await queryActivityByIdWithRelations({
		activity_id: activity.activity_id,
	});
	res.json(updatedActivity);
};

export default putTaskCompletion;
