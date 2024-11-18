import { insertHabitWithTags } from "@/lib/data/insert-habit";
import { HabitInput } from "@t/data/habit.types";
import { RequestHandler } from "express";

const postHabit: RequestHandler = async (req, res) => {
	const { habit, tagIds } = req.body as HabitInput;
	const habitWithTags = await insertHabitWithTags({ habit, tagIds });
	res.json(habitWithTags);
};

export default postHabit;
