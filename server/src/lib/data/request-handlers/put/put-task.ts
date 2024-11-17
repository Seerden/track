import { queryActivityByIdWithRelations } from "@/lib/data/query-activities";
import { updateActivityCompletion } from "@/lib/data/update-activity";
import { RequestHandler } from "express";
import { ActivityUpdateInput } from "types/data/activity.types";

const putTaskCompletion: RequestHandler = async (req, res) => {
	const { input } = req.body as { input: ActivityUpdateInput };
	const [activity] = await updateActivityCompletion({ input });
	const updatedActivity = await queryActivityByIdWithRelations({
		activity_id: activity.activity_id,
	});
	res.json(updatedActivity);
};

export default putTaskCompletion;
