import { sqlConnection } from "@/db/init";
import { isNullish } from "@shared/lib/is-nullish";
import type { Activity, ActivityWithIds } from "@shared/lib/schemas/activity";
import type { Timestamp } from "@shared/lib/schemas/timestamp";
import type { ActivityTagRelation } from "@shared/types/data/relational.types";
import type { ById, ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { mergeActivitiesAndRelations } from "./merge-activities-and-relations";

// TODO (TRK-???) for the query by to/from, if we do that, we probably still
// want access to recurring activities for now. High prio: rework the
// syntheticActivties creation to always ensure recurring activities are
// fetched. Probably make it a separate query that is integrated in the
// useQueryActivities hook, so that we can still use the optimized activities
// query without needing `OR will_recur = true` in the SQL query here.
export const queryActivitiesByUser: QueryFunction<
	{
		user_id: ID;
		recurring?: boolean;
		tasks?: boolean;
		from?: Timestamp;
		to?: Timestamp;
		completed?: boolean;
	},
	Promise<Activity[]>
> = async ({ sql = sqlConnection, user_id, recurring, tasks, from, to, completed }) => {
	const recurringSql = recurring ? sql`and recurrence_id is not null` : sql``;
	const taskSql = tasks ? sql`and is_task = true` : sql``;

	const completedSql =
		tasks && !isNullish(completed)
			? completed
				? sql`and completed is true`
				: sql`and completed is not true`
			: sql``;

	const fromSql = !from
		? sql``
		: sql`
      and (
         (
            start_date is null 
            and started_at >= ${from.valueOf()}
         ) or (
            started_at is null
            and start_date >= ${from.valueOf()}
         )
      ) 
      or (
         will_recur = true
      )
   `;

	const toSql = !to
		? sql``
		: sql`
         and (
            (
               end_date is null 
               and ended_at <= ${to.valueOf()}
            ) or (
               ended_at is null
               and end_date <= ${to.valueOf()}
            )
         ) 
         or (
            will_recur = true
         )
      `;

	return await sql<Activity[]>`
      select * from activities 
      where user_id = ${user_id} 
      ${recurringSql}
      ${taskSql}
      ${fromSql}
      ${toSql}
      ${completedSql}
   `;
};

export const queryActivityById: QueryFunction<
	{ activity_id: ID },
	Promise<Activity>
> = async ({ sql = sqlConnection, activity_id }) => {
	const [activity] = await sql<
		Activity[]
	>`select * from activities where activity_id = ${activity_id}`;
	return activity;
};

export const queryTagRelationsForActivity: QueryFunction<
	{ activity_id: ID },
	Promise<ActivityTagRelation[]>
> = ({ sql = sqlConnection, activity_id }) => {
	return sql<
		ActivityTagRelation[]
	>`select * from activities_tags where activity_id = ${activity_id}`;
};

export const queryActivityTagsByUser: QueryFunction<
	{ user_id: ID },
	Promise<ActivityTagRelation[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<ActivityTagRelation[]>`
      select * from activities_tags 
      where user_id = ${user_id}
   `;
};

export const queryActivityByIdWithRelations: QueryFunction<
	{ activity_id: ID },
	Promise<ActivityWithIds>
> = async ({ sql = sqlConnection, activity_id }) => {
	const activity = await queryActivityById({ sql, activity_id });
	const tagRelations = await queryTagRelationsForActivity({ sql, activity_id });
	const merged = mergeActivitiesAndRelations([activity], tagRelations);
	return merged[activity_id];
};

/** Fetch all of a user's activities, all the activityTagRelations, and for each
 * activity, merge the tags into activity.tags.
 * @todo TRK-206: consider implementing an optional parameter, `recurring`, that
 * when specified only fetches recurring activities.
 * @todo TRK-206: recurring activities will all use the same tags (those from
 * the original activity). Expand this function to include pass those tags to the */
export const queryActivitiesAndRelations: QueryFunction<
	{
		user_id: ID;
		recurring?: boolean;
		tasks?: boolean;
		from?: Timestamp;
		to?: Timestamp;
		completed?: boolean;
	},
	Promise<ById<ActivityWithIds>>
> = async ({ sql = sqlConnection, user_id, recurring, tasks, from, to, completed }) => {
	const activities = await queryActivitiesByUser({
		sql,
		user_id,
		recurring,
		tasks,
		from,
		to,
		completed,
	});

	const activityTagRelations = await queryActivityTagsByUser({ sql, user_id });

	return mergeActivitiesAndRelations(activities, activityTagRelations);
};
