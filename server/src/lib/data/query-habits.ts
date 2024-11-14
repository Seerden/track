import { sqlConnection } from "@/db/init";
import { mergeHabitsAndRelations } from "@/lib/data/merge-habits-and-relations";
import { queryHabitEntriesByUser } from "@/lib/data/query-habit-entries";
import type { RequestHandler } from "express";
import { Habit } from "types/data/habit.types";
import { HabitTagRelation } from "types/data/relational.types";
import { ID } from "types/data/utility.types";
import { WithSQL } from "types/sql.types";

async function queryHabitsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<Habit[]>`select * from habits where user_id = ${user_id}`;
}

async function queryHabitTagsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<HabitTagRelation[]>`select * from habits_tags where user_id = ${user_id}`;
}

async function queryHabitsAndRelations({ user_id }: { user_id: ID }) {
	const habits = await queryHabitsByUser({ user_id });
	const habitTagRelations = await queryHabitTagsByUser({ user_id });
	const entries = await queryHabitEntriesByUser({ user_id });

	return mergeHabitsAndRelations(habits, habitTagRelations, entries);
}

export const getHabits: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id; // always exists if we're here, because of middleware
	const habitsById = await queryHabitsAndRelations({ user_id });
	res.json({ byId: habitsById });
};
