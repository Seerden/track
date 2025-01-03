import { insertHabitEntry } from "@/lib/data/models/habits/insert-habit-entry";
import type { HabitEntryInput } from "@shared/types/data/habit.types";
import type { RequestHandler } from "express";

export const postHabitEntry: RequestHandler = async (req, res) => {
	const { habitEntry } = req.body as HabitEntryInput;
	const insertedHabitEntry = await insertHabitEntry({ habitEntry });
	res.json({ habitEntry: insertedHabitEntry });
};
