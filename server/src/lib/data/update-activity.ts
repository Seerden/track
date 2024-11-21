import { sqlConnection } from "@/db/init";
import { linkTagsToActivity } from "@/lib/data/insert-activity";
import type {
	Activity,
	ActivityUpdateInput,
	ActivityWithIds,
	TaskUpdateInput,
} from "@t/data/activity.types";
import type { ActivityTagRelation } from "@t/data/relational.types";
import type { Maybe } from "@t/data/utility.types";
import dayjs from "dayjs";
import type { DatabaseInteractionFunction, WithSQL } from "types/sql.types";

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

// const possibleActivityUpdateFields: (keyof Activity)[] = [
// 	"name",
// 	"description",
// 	"start_date",
// 	"end_date",
// 	"started_at",
// 	"ended_at",
// 	"is_task",
// 	"completed",
// ];

export const updateActivity: DatabaseInteractionFunction<
	{
		input: ActivityUpdateInput;
	},
	Promise<ActivityWithIds>
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

// TODO: this should be in the same file as linkTagsToActivity
export const unlinkTagsFromActivity: DatabaseInteractionFunction<
	Pick<ActivityWithIds, "user_id" | "activity_id" | "tag_ids">,
	Promise<Maybe<ActivityTagRelation[]>>
> = async ({ sql = sqlConnection, activity_id, user_id }) => {
	return sql<ActivityTagRelation[]>`
      DELETE FROM activities_tags
      WHERE activity_id = ${activity_id}
      AND user_id = ${user_id}
      RETURNING *
   `;
};
