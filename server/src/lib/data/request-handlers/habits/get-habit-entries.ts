import { groupById } from "@/lib/data/models/group-by-id";
import { queryHabitEntriesByUser } from "@/lib/data/models/habits/query-habit-entries";
import { getUserIdFromSessionOrBail } from "@/lib/data/request-handlers/get-user-id-from-session-or-bail";
import type { RequestHandler } from "express";

export const getHabitEntries: RequestHandler = async (req, res) => {
	const user_id = getUserIdFromSessionOrBail(req, res);
	if (user_id) {
		const habitEntries = await queryHabitEntriesByUser({ user_id });
		res.json({ byId: groupById(habitEntries, "habit_entry_id") });
	}
};
