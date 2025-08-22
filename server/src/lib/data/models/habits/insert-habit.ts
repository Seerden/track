import { sqlConnection } from "@/db/init";
import type {
	Habit,
	HabitWithEntries,
	NewHabit,
} from "@shared/lib/schemas/habit";
import type { HabitTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

const insertHabit: QueryFunction<{ habit: NewHabit }, Promise<Habit>> = async ({
	sql = sqlConnection,
	habit,
}) => {
	const [insertedHabit] = await sql<[Habit]>`
      insert into habits ${sql(habit)}
      returning *
   `;

	return insertedHabit;
};

const linkTagsToHabit: QueryFunction<
	{ user_id: ID; habit_id: ID; tagIds: ID[] },
	Promise<HabitTagRelation[]>
> = async ({ sql = sqlConnection, user_id, habit_id, tagIds }) => {
	const tagRelations = tagIds.map((tag_id) => ({ user_id, habit_id, tag_id }));

	return sql<HabitTagRelation[]>`
      insert into habits_tags ${sql(tagRelations)}
      returning *
   `;
};

export const insertHabitWithTags: QueryFunction<
	{ habit: NewHabit; tagIds?: ID[] },
	Promise<HabitWithEntries>
> = async ({ sql = sqlConnection, habit, tagIds }) => {
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

		return Object.assign(insertedHabit, {
			tag_ids: linkedTagIds,
			entry_ids: [],
		});
	});
};
