import type {
	Habit,
	HabitWithEntries,
	NewHabit,
} from "@shared/lib/schemas/habit";
import type { HabitTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { createTransaction, query } from "@/lib/query-function";

const insertHabit = query(async (sql, { habit }: { habit: NewHabit }) => {
	const [insertedHabit] = await sql<[Habit]>`
      insert into habits ${sql(habit)}
      returning *
   `;

	return insertedHabit;
});

const linkTagsToHabit = query(
	async (
		sql,
		{ user_id, habit_id, tagIds }: { user_id: ID; habit_id: ID; tagIds: ID[] }
	) => {
		const tagRelations = tagIds.map((tag_id) => ({
			user_id,
			habit_id,
			tag_id,
		}));

		return sql<HabitTagRelation[]>`
         insert into habits_tags ${sql(tagRelations)}
         returning *
      `;
	}
);

export const insertHabitWithTags = query(
	async ({ habit, tagIds }: { habit: NewHabit; tagIds?: ID[] }) => {
		return await createTransaction(async () => {
			const insertedHabit = await insertHabit({ habit });
			let linkedTagIds: ID[] = [];

			if (Array.isArray(tagIds) && tagIds?.length) {
				const relations = await linkTagsToHabit({
					user_id: insertedHabit.user_id,
					habit_id: insertedHabit.habit_id,
					tagIds,
				});
				linkedTagIds = relations.map((r) => r.tag_id);
			}

			return Object.assign(insertedHabit, {
				tag_ids: linkedTagIds,
				entries: [],
			}) satisfies HabitWithEntries;
		});
	}
);
