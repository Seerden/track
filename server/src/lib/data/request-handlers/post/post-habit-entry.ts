import { insertHabitEntry } from "@/lib/data/insert-habit-entry";
import type { HabitEntryInput } from "@t/data/habit.types";
import type { RequestHandler } from "express";

const postHabitEntry: RequestHandler = async (req, res) => {
	const { habitEntry } = req.body as HabitEntryInput;
	const insertedHabitEntry = await insertHabitEntry({ habitEntry });
	res.json({ habitEntry: insertedHabitEntry });
};

export default postHabitEntry;
