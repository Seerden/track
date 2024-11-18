import { deleteHabitById } from "@/lib/data/delete-habit";
import type { RequestHandler } from "express";

const deleteHabit: RequestHandler = async (req, res) => {
	const { habit_id } = req.params;
	const deletedHabitId = await deleteHabitById({ habit_id: +habit_id });
	res.json({ habit_id: deletedHabitId });
};

export default deleteHabit;
