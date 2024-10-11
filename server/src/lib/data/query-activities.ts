import { Activity } from "../../../types/data/activity.types";
import { ActivityTagRelation } from "../../../types/data/relational.types";
import { ID } from "../../../types/data/utility.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";
import { mergeActivitiesAndRelations } from "./merge-activities-and-relations";

export async function queryActivitiesByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<Activity[]>`select * from activities where user_id = ${user_id}`;
}

export async function queryActivityTagsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<
		ActivityTagRelation[]
	>`select * from activities_tags where user_id = ${user_id}`;
}

export async function queryActivitiesAndRelations({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	const activities = await queryActivitiesByUser({ sql, user_id });
	const activityTagRelations = await queryActivityTagsByUser({ sql, user_id });

	return mergeActivitiesAndRelations(activities, activityTagRelations);
}
