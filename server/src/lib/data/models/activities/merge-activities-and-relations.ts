import { groupById } from "@/lib/data/models/group-by-id";
import type { Activity, ActivityWithIds } from "@shared/types/data/activity.types";
import type { ActivityTagRelation } from "@shared/types/data/relational.types";
import type { ById } from "@shared/types/data/utility.types";

export function mergeActivitiesAndRelations(
	activities: Activity[],
	activityTagRelations: ActivityTagRelation[],
) {
	const activitiesById = groupById(activities, "activity_id");

	const withTagIds = activitiesById as ById<ActivityWithIds>;
	for (const activity of activities) {
		withTagIds[activity.activity_id] = Object.assign({}, activity, { tag_ids: [] });
	}

	for (const { activity_id, tag_id } of activityTagRelations) {
		withTagIds[activity_id]?.tag_ids?.push(tag_id);
	}

	return withTagIds;
}
