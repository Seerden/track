import { sqlConnection } from "@/db/init";
import type { Activity, ActivityWithIds } from "@t/data/activity.types";
import type { ActivityTagRelation } from "@t/data/relational.types";
import type { ById, ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { mergeActivitiesAndRelations } from "./merge-activities-and-relations";

export const queryActivitiesByUser: QueryFunction<
	{ user_id: ID },
	Promise<Activity[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<Activity[]>`select * from activities where user_id = ${user_id}`;
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
	return sql<
		ActivityTagRelation[]
	>`select * from activities_tags where user_id = ${user_id}`;
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

export const queryActivitiesAndRelations: QueryFunction<
	{ user_id: ID },
	Promise<ById<ActivityWithIds>>
> = async ({ sql = sqlConnection, user_id }) => {
	const activities = await queryActivitiesByUser({ sql, user_id });
	const activityTagRelations = await queryActivityTagsByUser({ sql, user_id });

	return mergeActivitiesAndRelations(activities, activityTagRelations);
};
