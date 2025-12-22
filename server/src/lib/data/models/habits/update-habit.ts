import { isNullish } from "@shared/lib/is-nullish";
import type { Habit } from "@shared/lib/schemas/habit";
import type { HabitUpdateInput } from "@shared/lib/schemas/habit.input";
import type { HabitTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { linkTagsToHabit } from "@/lib/data/models/habits/insert-habit";
import {
	queryHabitTags,
	userOwnsHabit,
} from "@/lib/data/models/habits/query-habits";
import { createTransaction, query } from "@/lib/query-function";

/** Remove the given habits_tags rows. */
const unlinkTagsFromHabit = query(
	async (
		sql,
		{ habit_id, user_id, tagIds }: { habit_id: ID; user_id: ID; tagIds: ID[] }
	) => {
		return await sql<HabitTagRelation[]>`
      delete from ${sql(TABLES.HABITS_TAGS)}
      where habit_id = ${habit_id}
      and tag_id = any(${tagIds})
      and user_id = ${user_id}
      returning *
   `;
	}
);

/** Helper for updateHabit that sets the habit's tags to the updated state. */
const updateHabitTags = query(
	async ({
		habit_id,
		user_id,
		tagIds,
	}: {
		habit_id: ID;
		user_id: ID;
		tagIds: ID[];
	}) => {
		const existingTags = await queryHabitTags({ habit_id, user_id });
		const existingTagIdsSet = new Set(existingTags.map((t) => t.tag_id));
		const newTagIdsSet = new Set(tagIds);

		// first, unlink the tags that the user doesn't want to be part of the
		// habit anymore.
		const tagsToUnlink = [...existingTagIdsSet].filter(
			(tag_id) => !newTagIdsSet.has(tag_id)
		);
		if (tagsToUnlink.length) {
			await unlinkTagsFromHabit({ habit_id, user_id, tagIds: tagsToUnlink });
		}

		// then, link all the tags that the user wants to be part of the habit.
		// We don't have to filter any already-linked tags, because
		// `linkTagsToHabit` ignores conflicts.
		const tags = await linkTagsToHabit({ habit_id, user_id, tagIds });

		return tags;
	}
);

/** Update an existing habit.
 * @todo extract tag update into a function */
export const updateHabit = query(
	async ({ input, user_id }: { input: HabitUpdateInput; user_id: ID }) => {
		return await createTransaction(async (sql) => {
			const { habit, tagIds } = input;
			const { habit_id, user_id: _user_id, ...habitFields } = habit;

			if (!(await userOwnsHabit({ habit_id: habit.habit_id, user_id }))) {
				return;
			}

			const [updatedHabit] = await sql<Habit[]>`
            update ${sql(TABLES.HABITS)}
            set ${sql(habitFields)}
            where habit_id = ${habit.habit_id}
            returning *
         `;

			if (isNullish(tagIds)) {
				return {
					...updatedHabit,
					tag_ids: [],
				};
			}

			// then, reconcile tags
			// NOTE: I guess we could optionally skip this if tagIds is nullish, but
			// the client should, in its current state at least, always return an
			// empty list, and not a nullish value, when there are no tags linked to a
			// habit (i.e. when `TagSelector` is empty).
			const tags = await updateHabitTags({
				habit_id: updatedHabit.habit_id,
				user_id,
				tagIds,
			});

			return {
				...updatedHabit,
				tag_ids: tags.map((t) => t.tag_id),
			};
		});
	}
);
