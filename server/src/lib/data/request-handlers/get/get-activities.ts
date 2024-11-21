import { queryActivitiesAndRelations } from "@/lib/data/models/activities/query-activities";
import type { RequestHandler } from "express";

const getActivities: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id;
	const activitiesById = await queryActivitiesAndRelations({ user_id });

	res.json({ byId: activitiesById });
};

export default getActivities;
