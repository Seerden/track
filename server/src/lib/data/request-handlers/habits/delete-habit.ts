import { deleteHabitById } from "@/lib/data/models/habits/delete-habit";
import type { RequestHandler } from "express";

export const deleteHabit: RequestHandler = async (req, res) => {
	const { habit_id } = req.params;
	const deletedHabitId = await deleteHabitById({ habit_id: +habit_id });
	res.json({ habit_id: deletedHabitId });
};
