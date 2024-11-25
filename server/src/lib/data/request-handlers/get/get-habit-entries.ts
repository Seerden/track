import { groupById } from "@/lib/data/models/group-by-id";
import { queryHabitEntriesByUser } from "@/lib/data/models/habits/query-habit-entries";
import type { RequestHandler } from "express";

const getHabitEntries: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id;
	const habitEntries = await queryHabitEntriesByUser({ user_id });
	res.json({ byId: groupById(habitEntries, "habit_entry_id") });
};

export default getHabitEntries;
