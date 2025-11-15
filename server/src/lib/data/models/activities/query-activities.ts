import { isNullish } from "@shared/lib/is-nullish";
import type { Activity } from "@shared/lib/schemas/activity";
import type { Timestamp } from "@shared/lib/schemas/timestamp";
import type { ActivityTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";
import { mergeActivitiesAndRelations } from "./merge-activities-and-relations";
import { timeWindowFilter } from "./time-window-filter";

type QueryActivitiesInput = {
	user_id: ID;
	recurring?: boolean;
	tasks?: boolean;
	from?: Timestamp;
	to?: Timestamp;
	completed?: boolean;
};

export const queryActivitiesByUser = query(
	async (sql, input: QueryActivitiesInput) => {
		const { user_id, recurring, tasks, from, to, completed } = input;

		const recurringSql = recurring ? sql`and recurrence_id is not null` : sql``;
		const taskSql = tasks ? sql`and is_task = true` : sql``;

		const completedSql =
			tasks && !isNullish(completed)
				? completed
					? sql`and completed is true`
					: sql`and completed is not true`
				: sql``;

		const timeWindowSql = timeWindowFilter({ from, to });

		return await sql<Activity[]>`
         select * from activities 
         where user_id = ${user_id} 
         ${recurringSql}
         ${taskSql}
         ${timeWindowSql}
         ${completedSql}
      `;
	}
);

export const queryActivityById = query(
	async (sql, { activity_id, user_id }: { activity_id: ID; user_id?: ID }) => {
		const userIdSql = user_id ? sql`and user_id = ${user_id}` : sql``;

		const [activity] = await sql<[Activity?]>`
      select * from ${sql(TABLES.activities)} 
      where activity_id = ${activity_id} 
      ${userIdSql}
   `;
		return activity;
	}
);

export const queryTagRelationsForActivity = query(
	async (sql, { activity_id }: { activity_id: ID }) => {
		return sql<
			ActivityTagRelation[]
		>`select * from activities_tags where activity_id = ${activity_id}`;
	}
);

export const queryActivityTagsByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return sql<ActivityTagRelation[]>`
      select * from activities_tags 
      where user_id = ${user_id}
   `;
	}
);

// TODO: if this queries a non-original recurring activity, tag_ids will be
// empty. Figure out a way to get tag ids from the original activity
// efficiently.
export const queryActivityByIdWithRelations = query(
	async (sql, { activity_id, user_id }: { activity_id: ID; user_id: ID }) => {
		const activity = await queryActivityById({ activity_id });
		if (!activity) {
			return;
		}
		const tagRelations = await queryTagRelationsForActivity({ activity_id });
		const merged = await mergeActivitiesAndRelations(
			[activity],
			tagRelations,
			user_id
		);
		const activityWithRelations = merged.get(activity_id);
		if (!activityWithRelations) {
			throw new Error(`Activity with ID ${activity_id} not found`);
		}
		return activityWithRelations;
	}
);

/** Fetch all of a user's activities, all the activityTagRelations, and for each
 * activity, merge the tags into activity.tags.
 * @todo TRK-206: consider implementing an optional parameter, `recurring`, that
 * when specified only fetches recurring activities.
 * @todo TRK-206: recurring activities will all use the same tags (those from
 * the original activity). Expand this function to include pass those tags to the */
export const queryActivitiesAndRelations = query(
	async (input: QueryActivitiesInput) => {
		const activities = await queryActivitiesByUser(input);

		const { user_id } = input;
		// TODO: for this function, we already get _all_ of a user's tag relations,
		// so we can relatively easily make a Map(reccurenceId ->
		// originalActivity.tagIds) and assign the original activity's tag ids to the
		// recurring entries for the same recurrence relation. But for
		// queryActivitiesById, that doesn't work, because we don't have the full set
		// of tag relations.
		const activityTagRelations = await queryActivityTagsByUser({ user_id });

		return mergeActivitiesAndRelations(
			activities,
			activityTagRelations,
			user_id
		);
	}
);
