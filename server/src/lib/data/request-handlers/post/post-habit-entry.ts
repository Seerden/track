import { insertHabitEntry } from "@/lib/data/insert-habit-entry";
import { RequestHandler } from "express";
import { HabitEntryInput } from "types/data/habit.types";

const postHabitEntry: RequestHandler = async (req, res) => {
	const { habitEntry } = req.body as HabitEntryInput;
	const insertedHabitEntry = await insertHabitEntry({ habitEntry });
	res.json({ habitEntry: insertedHabitEntry });
};

export default postHabitEntry;
