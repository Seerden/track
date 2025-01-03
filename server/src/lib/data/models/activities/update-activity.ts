import { sqlConnection } from "@/db/init";
import {
	linkTagsToActivity,
	unlinkTagsFromActivity,
} from "@/lib/data/models/activities/link-and-unlink-tags-and-activities";
import type {
	Activity,
	ActivityUpdateInput,
	ActivityWithIds,
	TaskUpdateInput,
} from "@shared/types/data/activity.types";
import type { ActivityTagRelation } from "@shared/types/data/relational.types";
import dayjs from "dayjs";
import type { QueryFunction } from "types/sql.types";

/**
 * Updates the completion fields of an activity.
 * @todo Since we consider activities that have completion fields to be "tasks",
 * should we name this `updateTaskCompletion`?
 */
export const updateActivityCompletion: QueryFunction<
	{ input: TaskUpdateInput },
	Promise<Activity[]>
> = async ({ sql = sqlConnection, input }) => {
	const start = input.completion_start
		? dayjs(input.completion_start).toISOString()
		: null;
	const end = input.completion_end ? dayjs(input.completion_end).toISOString() : null;
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
};

/**
 * Update the meta values of an activity (currently, that means everything
 * exception the completion-related fields of a task).
 */
export const updateActivity: QueryFunction<
	{
		input: ActivityUpdateInput;
	},
	Promise<ActivityWithIds>
> = async ({ sql = sqlConnection, input }) => {
	return sql.begin(async (q) => {
		const { tag_ids, ...activityUpdate } = input.activity;

		const [activity] = await sql<[Activity]>`
         UPDATE activities
            SET ${sql(activityUpdate)}
            WHERE activity_id = ${input.activity.activity_id}
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
};
