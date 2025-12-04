import day from "@shared/lib/day";
import type {
	Activity,
	ActivityUpdateInput,
	ActivityWithIds,
	TaskUpdateInput,
} from "@shared/lib/schemas/activity";
import type { ActivityTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
import {
	linkTagsToActivity,
	unlinkTagsFromActivity,
} from "@/lib/data/models/activities/link-and-unlink-tags-and-activities";
import { query } from "@/lib/query-function";

/**
 * Updates the completion fields of an activity.
 * @todo Since we consider activities that have completion fields to be "tasks",
 * should we name this `updateTaskCompletion`?
 */
export const updateActivityCompletion = query(
	async (sql, { input }: { input: TaskUpdateInput }) => {
		const start = input.completion_start
			? day(input.completion_start as Dayjs).toISOString()
			: null;
		const end = input.completion_end
			? day(input.completion_end as Dayjs).toISOString()
			: null;
		// Writing the fields out manually is a bit verbose, but it's clearer than
		// manipulating and using ${input}
		return sql<[Activity]>`
         update activities 
         set completed = ${input.completed ?? null},
            completion_start = ${start},
            completion_end = ${end}
         where activity_id = ${input.activity_id}
         returning *
      `;
	}
);

/**
 * Update the meta values of an activity (currently, that means everything
 * except the completion-related fields of a task).
 */
export const updateActivity = query(
	async (sql, { input }: { input: ActivityUpdateInput }) => {
		return sql.begin(async (q) => {
			const { tag_ids, user_id, ...activityUpdate } = input.activity;

			const { activity_id, ...update } = activityUpdate;
			const [activity] = await sql<[Activity]>`
            UPDATE activities
               SET ${sql(update)}
               WHERE activity_id = ${activity_id}
               RETURNING *
         `;

			let relations: ActivityTagRelation[] = [];
			if (input.tag_ids) {
				const args = {
					sql: q,
					activity_id: input.activity.activity_id,
					user_id: input.activity.user_id,
					tag_ids: input.tag_ids,
				};

				await unlinkTagsFromActivity(args);
				relations = await linkTagsToActivity(args);
			}
			return Object.assign(activity, {
				tag_ids: relations.map((r) => r.tag_id),
			});
		});
	}
);

/** Sets the `recurrence_id` for the activity with the specified `activity_id`. */
export const updateActivityRecurrence = query(
	async (
		sql,
		{ activity_id, recurrence_id }: { activity_id: ID; recurrence_id: ID }
	) => {
		const [updated] = await sql<[Pick<ActivityWithIds, "activity_id">]>`
         UPDATE activities
         SET recurrence_id = ${recurrence_id}
         WHERE activity_id = ${activity_id}
         RETURNING activity_id
      `;

		return updated;
	}
);
