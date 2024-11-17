import { insertHabitWithTags } from "@/lib/data/insert-habit";
import { RequestHandler } from "express";
import { HabitInput } from "types/data/habit.types";

const postHabit: RequestHandler = async (req, res) => {
	const { habit, tagIds } = req.body as HabitInput;
	const habitWithTags = await insertHabitWithTags({ habit, tagIds });
	res.json(habitWithTags);
};

export default postHabit;
