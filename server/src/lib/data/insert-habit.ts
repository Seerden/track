import { sqlConnection } from "@/db/init";
import { RequestHandler } from "express";
import { Habit, HabitInput, NewHabit } from "types/data/habit.types";
import { HabitTagRelation } from "types/data/relational.types";
import { ID } from "types/data/utility.types";
import { WithSQL } from "types/sql.types";

async function insertHabit({ sql = sqlConnection, habit }: WithSQL<{ habit: NewHabit }>) {
	const [insertedHabit] = await sql<[Habit]>`
      insert into habits ${sql(habit)}
      returning *
   `;

	return insertedHabit;
}

async function linkTagsToHabit({
	sql = sqlConnection,
	user_id,
	habit_id,
	tag_ids,
}: WithSQL<{ habit_id: ID; user_id: ID; tag_ids: ID[] }>) {
	const tagRelations = tag_ids.map((tag_id) => ({ user_id, habit_id, tag_id }));

	return sql<HabitTagRelation[]>`
      insert into habits_tags ${sql(tagRelations)}
      returning *
   `;
}

export async function insertHabitWithTags({
	sql = sqlConnection,
	habit,
	tag_ids,
}: WithSQL<{ habit: NewHabit; tag_ids?: ID[] }>) {
	return await sql.begin(async (q) => {
		const insertedHabit = await insertHabit({ sql: q, habit });
		let linkedTagIds: ID[] = [];

		if (Array.isArray(tag_ids) && tag_ids?.length) {
			const relations = await linkTagsToHabit({
				sql: q,
				user_id: insertedHabit.user_id,
				habit_id: insertedHabit.habit_id,
				tag_ids,
			});
			linkedTagIds = relations.map((r) => r.tag_id);
		}

		return Object.assign(insertedHabit, { tag_ids: linkedTagIds });
	});
}

export const postHabits: RequestHandler = async (req, res) => {
	const { habit, tag_ids } = req.body as HabitInput;
	const habitWithTags = await insertHabitWithTags({ habit, tag_ids });
	res.json(habitWithTags);
};
