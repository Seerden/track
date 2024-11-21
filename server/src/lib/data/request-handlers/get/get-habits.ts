import { queryHabitsAndRelations } from "@/lib/data/models/habits/query-habits";
import type { RequestHandler } from "express";

const getHabits: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id; // always exists if we're here, because of middleware
	const habitsById = await queryHabitsAndRelations({ user_id });
	res.json({ byId: habitsById });
};

export default getHabits;
