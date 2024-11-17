import { groupById, queryHabitEntriesByUser } from "@/lib/data/query-habit-entries";
import { RequestHandler } from "express";

const getHabitEntries: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id;
	const habitEntries = await queryHabitEntriesByUser({ user_id });
	res.json({ byId: groupById(habitEntries, "habit_entry_id") });
};

export default getHabitEntries;
