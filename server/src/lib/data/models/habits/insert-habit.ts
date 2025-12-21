import type {
	Habit,
	HabitWithEntries,
	NewHabit,
} from "@shared/lib/schemas/habit";
import type { HabitTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { createTransaction, query } from "@/lib/query-function";

const insertHabit = query(
	async (sql, { habit, user_id }: { habit: NewHabit; user_id: ID }) => {
		const [insertedHabit] = await sql<[Habit]>`
      insert into habits ${sql({ ...habit, user_id })}
      returning *
   `;

		return insertedHabit;
	}
);

export const linkTagsToHabit = query(
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
            on conflict do nothing
         returning *
      `;
	}
);

export const insertHabitWithTags = query(
	async ({
		habit,
		tagIds,
		user_id,
	}: {
		habit: NewHabit;
		tagIds?: ID[];
		user_id: ID;
	}) => {
		return await createTransaction(async () => {
			const insertedHabit = await insertHabit({ habit, user_id });
			let linkedTagIds: ID[] = [];

			if (Array.isArray(tagIds) && tagIds?.length) {
				const relations = await linkTagsToHabit({
					user_id,
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
