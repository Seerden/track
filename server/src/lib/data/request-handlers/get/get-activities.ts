import { queryActivitiesAndRelations } from "@/lib/data/query-activities";
import { RequestHandler } from "express";

const getActivities: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id;
	const activitiesById = await queryActivitiesAndRelations({ user_id });

	res.json({ byId: activitiesById });
};

export default getActivities;
