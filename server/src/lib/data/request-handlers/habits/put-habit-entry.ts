import { updateHabitEntry } from "@/lib/data/models/habits/update-habit-entry";
import type { HabitEntryUpdateInput } from "@shared/types/data/habit.types";
import type { RequestHandler } from "express";

export const putHabitEntry: RequestHandler = async (req, res) => {
	const input = req.body as HabitEntryUpdateInput;
	const [habitEntry] = await updateHabitEntry({ input });
	res.json({ habitEntry });
};
