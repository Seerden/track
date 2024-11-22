import { sqlConnection } from "@/db/init";
import type { Activity } from "@t/data/activity.types";
import type { ActivityTagRelation } from "@t/data/relational.types";
import type { ID } from "@t/data/utility.types";
import type { WithSQL } from "types/sql.types";
import { mergeActivitiesAndRelations } from "./merge-activities-and-relations";

export async function queryActivitiesByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<Activity[]>`select * from activities where user_id = ${user_id}`;
}

export async function queryActivityById({
	sql = sqlConnection,
	activity_id,
}: WithSQL<{ activity_id: ID }>) {
	const [activity] = await sql<
		Activity[]
	>`select * from activities where activity_id = ${activity_id}`;
	return activity;
}

export async function queryTagRelationsForActivity({
	sql = sqlConnection,
	activity_id,
}: WithSQL<{ activity_id: ID }>) {
	return sql<
		ActivityTagRelation[]
	>`select * from activities_tags where activity_id = ${activity_id}`;
}

export async function queryActivityTagsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<
		ActivityTagRelation[]
	>`select * from activities_tags where user_id = ${user_id}`;
}

export async function queryActivityByIdWithRelations({
	sql = sqlConnection,
	activity_id,
}: WithSQL<{
	activity_id: ID;
}>) {
	const activity = await queryActivityById({ sql, activity_id });
	const tagRelations = await queryTagRelationsForActivity({ sql, activity_id });
	const merged = mergeActivitiesAndRelations([activity], tagRelations);
	return merged[activity_id];
}

export async function queryActivitiesAndRelations({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	const activities = await queryActivitiesByUser({ sql, user_id });
	const activityTagRelations = await queryActivityTagsByUser({ sql, user_id });

	return mergeActivitiesAndRelations(activities, activityTagRelations);
}