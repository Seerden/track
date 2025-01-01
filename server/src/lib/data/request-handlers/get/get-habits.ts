import { queryHabitsAndRelations } from "@/lib/data/models/habits/query-habits";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express";

const getHabits: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const habitsById = await queryHabitsAndRelations({ user_id });
		res.json({ byId: habitsById });
	}
};

export default getHabits;
