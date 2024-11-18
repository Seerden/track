import { sqlConnection } from "@/db/init";
import type { Habit, HabitWithIds, NewHabit } from "@t/data//habit.types";
import type { HabitTagRelation } from "@t/data//relational.types";
import type { ID } from "@t/data//utility.types";
import type { WithSQL } from "types/sql.types";

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
	tagIds,
}: WithSQL<{ habit_id: ID; user_id: ID; tagIds: ID[] }>) {
	const tagRelations = tagIds.map((tag_id) => ({ user_id, habit_id, tag_id }));

	return sql<HabitTagRelation[]>`
      insert into habits_tags ${sql(tagRelations)}
      returning *
   `;
}

export async function insertHabitWithTags({
	sql = sqlConnection,
	habit,
	tagIds,
}: WithSQL<{ habit: NewHabit; tagIds?: ID[] }>): Promise<HabitWithIds> {
	return await sql.begin(async (q) => {
		const insertedHabit = await insertHabit({ sql: q, habit });
		let linkedTagIds: ID[] = [];

		if (Array.isArray(tagIds) && tagIds?.length) {
			const relations = await linkTagsToHabit({
				sql: q,
				user_id: insertedHabit.user_id,
				habit_id: insertedHabit.habit_id,
				tagIds,
			});
			linkedTagIds = relations.map((r) => r.tag_id);
		}

		return Object.assign(insertedHabit, { tag_ids: linkedTagIds, entry_ids: [] });
	});
}
