import { queryActivitiesAndRelations } from "@/lib/data/models/activities/query-activities";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";

export const getActivities: RequestHandlerWithUserId = async ({ res }, user_id) => {
	const activitiesById = await queryActivitiesAndRelations({ user_id });
	res.json({ byId: activitiesById });
};
