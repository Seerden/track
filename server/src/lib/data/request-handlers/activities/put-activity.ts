import { queryActivityByIdWithRelations } from "@/lib/data/models/activities/query-activities";
import { updateActivity } from "@/lib/data/models/activities/update-activity";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";
import type { ActivityUpdateInput } from "@shared/types/data/activity.types";

export const putActivity: RequestHandlerWithUserId = async ({ req, res }) => {
	const input = req.body as ActivityUpdateInput;
	const activity = await updateActivity({ input });
	const updatedActivity = await queryActivityByIdWithRelations({
		activity_id: activity.activity_id,
	});
	res.json(updatedActivity);
};
