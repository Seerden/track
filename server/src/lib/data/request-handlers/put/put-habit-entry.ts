import { updateHabitEntry } from "@/lib/data/models/habits/update-habit-entry";
import type { HabitEntryUpdateInput } from "@t/data/habit.types";
import type { RequestHandler } from "express";

const putHabitEntry: RequestHandler = async (req, res) => {
	const { input } = req.body as { input: HabitEntryUpdateInput };
	const [habitEntry] = await updateHabitEntry({ input });
	res.json({ habitEntry });
};

export default putHabitEntry;
