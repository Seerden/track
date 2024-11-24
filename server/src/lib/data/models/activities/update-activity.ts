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
} from "@t/data/activity.types";
import type { ActivityTagRelation } from "@t/data/relational.types";
import dayjs from "dayjs";
import type { QueryFunction, WithSQL } from "types/sql.types";

export async function updateActivityCompletion({
	sql = sqlConnection,
	input,
}: WithSQL<{ input: TaskUpdateInput }>) {
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
}

export const updateActivity: QueryFunction<
	{
		input: ActivityUpdateInput;
	},
	ActivityWithIds
> = async ({ sql = sqlConnection, input }) => {
	return await sql.begin(async (q) => {
		const { tag_ids, ...activityUpdate } = input.activity;

		const vals = sql(activityUpdate);

		const [activity] = await sql<[Activity]>`
         UPDATE activities
            SET ${vals}
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
		}) as ActivityWithIds;
	});
};
