import { insertHabitWithTags } from "@/lib/data/models/habits/insert-habit";
import type { HabitInput } from "@shared/types/data/habit.types";
import type { RequestHandler } from "express";

export const postHabit: RequestHandler = async (req, res) => {
	const { habit, tagIds } = req.body as HabitInput;
	const habitWithTags = await insertHabitWithTags({ habit, tagIds });
	res.json(habitWithTags);
};
