import { queryActivityByIdWithRelations } from "@/lib/data/models/activities/query-activities";
import { updateActivityCompletion } from "@/lib/data/models/activities/update-activity";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";
import type { TaskUpdateInput } from "@shared/types/data/activity.types";

export const putTaskCompletion: RequestHandlerWithUserId = async ({ req, res }) => {
	const input = req.body as TaskUpdateInput;
	const [activity] = await updateActivityCompletion({ input });
	const updatedActivity = await queryActivityByIdWithRelations({
		activity_id: activity.activity_id,
	});
	res.json(updatedActivity);
};
