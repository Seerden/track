import { updateHabitEntry } from "@/lib/data/update-habit-entry";
import { RequestHandler } from "express";
import { HabitEntryUpdateInput } from "types/data/habit.types";

const putHabitEntry: RequestHandler = async (req, res) => {
	const { input } = req.body as { input: HabitEntryUpdateInput };
	const [habitEntry] = await updateHabitEntry({ input });
	res.json({ habitEntry });
};

export default putHabitEntry;
