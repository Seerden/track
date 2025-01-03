import { queryActivitiesAndRelations } from "@/lib/data/models/activities/query-activities";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express";

export const getActivities: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const activitiesById = await queryActivitiesAndRelations({ user_id });

		res.json({ byId: activitiesById });
	}
};
